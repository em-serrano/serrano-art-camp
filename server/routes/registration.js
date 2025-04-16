const express = require("express");
const router = express.Router();
const Registration = require("../models/RegistrationSchema.js");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const sanitizeInput = require("../utils/sanitize");

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: "Too many attempts. Please try again in 15 minutes.",
    });
  },
});

// Create a new registration
router.post("/", limiter, async (req, res) => {
  try {
    const formData = req.body;

    // Honeypot check
    if (formData.website && formData.website.length > 0) {
      return res.status(400).json({ success: false, message: "Bot detected" });
    }

    // Sanitize inputs
    if (!formData.registrationInfo || !formData.registrationInfo.camperName) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    formData.registrationInfo.camperName = sanitizeInput(
      formData.registrationInfo.camperName
    );
    formData.registrationInfo.parentName = sanitizeInput(
      formData.registrationInfo.parentName
    );
    formData.registrationInfo.email = sanitizeInput(
      formData.registrationInfo.email
    );

    // Format data for MongoDB
    const selectedSessions = Object.keys(formData.sessions)
      .filter((session) => formData.sessions[session])
      .join(", ");

    const selectedGrade = Object.keys(formData.gradeLevel)
      .filter((grade) => formData.gradeLevel[grade])
      .join(", ");

    // Create MongoDB document
    const registration = new Registration({
      parentName: formData.registrationInfo.parentName,
      email: formData.registrationInfo.email,
      phone: formData.registrationInfo.contactNumber,
      childName: formData.registrationInfo.camperName,
      childGrade: selectedGrade,
      weekSelection: selectedSessions.includes("June") ? "June" : "July",
      dietaryNeeds:
        Object.keys(formData.dietaryNeeds)
          .filter((need) => formData.dietaryNeeds[need] && need !== "None")
          .join(", ") || "None",
      allergies: formData.registrationInfo.allergies || "None",
      emergencyContact: formData.registrationInfo.emergencyContact,
      specialNotes: formData.registrationInfo.specialNeeds || "None",
      paymentStatus: "Unpaid",
      registrationStatus: "Pending",
    });

    // Save to MongoDB
    const savedRegistration = await registration.save();

    // Send confirmation email
    await sendConfirmationEmail(formData, savedRegistration._id);

    // Return success response
    res.status(201).json({
      success: true,
      message: "Registration submitted successfully",
      registrationId: savedRegistration._id,
      data: savedRegistration,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error processing registration",
    });
  }
});

// Email confirmation function
async function sendConfirmationEmail(formData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { camperName, parentName, email } = formData.registrationInfo;
  const selectedSessions = Object.keys(formData.sessions)
    .filter((session) => formData.sessions[session])
    .join(", ");
  const selectedGrade = Object.keys(formData.gradeLevel)
    .filter((grade) => formData.gradeLevel[grade])
    .join(", ");

  try {
    console.log("Attempting to send email to:", email);

    const info = await transporter.sendMail({
      from: '"Serrano Art Camp" <' + process.env.EMAIL_USER + ">",
      to: email,
      cc: process.env.ADMIN_EMAIL,
      subject: `Serrano Art Camp Registration Confirmation`,
      text: `
          Thank you for registering ${camperName} for Serrano Art Camp, 2025! 
          
          To complete registration and confirm your artist's spot please send registration fee to Molly Serrano thorugh Venmo or Zelle. Payment must be completed within 48 hours of registration. Weekly sessions are limited to 15 artists on a first come first serve basis. 
          Payment Options:
          - Venmo: Molly-Serrano
          - Zelle: (310)-871-5657
  
          Registration Details:
          - Camper: ${camperName}
          - Parent/Guardian: ${parentName}
          - Grade Level: ${selectedGrade}
          - Sessions: ${selectedSessions}
          
  
          I am so excited to have your child join me this summer!
        `,
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #558B87;">Serrano Art Camp Registration Confirmation!</h2>
            <p>Dear ${parentName},</p>
            <p>Thank you for registering <strong>${camperName}</strong> for Serrano Art Camp 2025!</p>
            <p>To complete registration and confirm your artist's spot, please send registration fee to Molly Serrano through Venmo. Payment must be completed within 48 hours of registration. First come first serve.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #558B87; margin-top: 0;">Registration Details:</h3>
              <ul>
              <li><strong>Location: Grace + Peace Church, 6301 Woodrow Ave. </strong></li>
                <li><strong>Artist:</strong> ${camperName}</li>
                <li><strong>Parent/Guardian:</strong> ${parentName}</li>
                <li><strong>Grade Level:</strong> ${selectedGrade}</li>
                <li><strong>Session(s):</strong> ${selectedSessions}</li>
              </ul>
            </div>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #558B87; margin-top: 0;">Payment Information:</h3>
              <h5 style="color: #558B87; margin-top: 0;">$250/week or $450 for both weeks</h5>
              <ul>
                <li><strong>Venmo:</strong> Molly-Serrano</li>
              </ul>
            </div>
            <p>I am excited to have your child join me this summer! Please check your email for more info as the camp dates approach.</p>
            <p>Best regards,<br>Mrs. Molly Serrano</p>
          </div>
        `,
    });

    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (emailError) {
    console.error("Email sending failed with error:", emailError);
    // Log full error for debugging
    console.error(JSON.stringify(emailError, null, 2));
    return false;
  }
}

// Get all registrations (admin only)
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({
      registrationDate: -1,
    });
    res.json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Mark payment received
router.put("/:id/payment", async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res
        .status(404)
        .json({ success: false, error: "Registration not found" });
    }

    registration.paymentStatus = "Paid";

    if (registration.registrationStatus === "Pending") {
      registration.registrationStatus = "Confirmed";
    }

    await registration.save();

    // If a spot was just confirmed, check if we need to update waitlist
    if (registration.registrationStatus === "Confirmed") {
      // Logic for waitlist management could go here
    }

    res.json({ success: true, data: registration });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
