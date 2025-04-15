// /api/registrations.js
const nodemailer = require('nodemailer');
const connectDB = require('../connections/MongoConn');
const Registration = require('../models/RegistrationSchema');
const rateLimit = require('express-rate-limit');
const sanitizeInput = require('../utils/sanitize');

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

// Main registration function
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { body } = req;

    // Honeypot check
    if (body.website && body.website.length > 0) {
      return res.status(400).json({ success: false, message: 'Bot detected' });
    }

    // Sanitize inputs
    if (!body.registrationInfo || !body.registrationInfo.camperName) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    body.registrationInfo.camperName = sanitizeInput(body.registrationInfo.camperName);
    body.registrationInfo.parentName = sanitizeInput(body.registrationInfo.parentName);
    body.registrationInfo.email = sanitizeInput(body.registrationInfo.email);

    // Format and save to MongoDB
    const selectedSessions = Object.keys(body.sessions)
      .filter((session) => body.sessions[session])
      .join(', ');

    const selectedGrade = Object.keys(body.gradeLevel)
      .filter((grade) => body.gradeLevel[grade])
      .join(', ');

    const registration = new Registration({
      parentName: body.registrationInfo.parentName,
      email: body.registrationInfo.email,
      phone: body.registrationInfo.contactNumber,
      childName: body.registrationInfo.camperName,
      childGrade: selectedGrade,
      weekSelection: selectedSessions.includes('June') ? 'June' : 'July',
      dietaryNeeds: Object.keys(body.dietaryNeeds)
        .filter((need) => body.dietaryNeeds[need] && need !== 'None')
        .join(', ') || 'None',
      allergies: body.registrationInfo.allergies || 'None',
      emergencyContact: body.registrationInfo.emergencyContact,
      specialNotes: body.registrationInfo.specialNeeds || 'None',
      paymentStatus: 'Unpaid',
      registrationStatus: 'Pending',
    });

    // Save registration to MongoDB
    await connectDB();
    const savedRegistration = await registration.save();

    // Send confirmation email
    await sendConfirmationEmail(body, savedRegistration._id);

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      registrationId: savedRegistration._id,
      data: savedRegistration,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error processing registration',
    });
  }
};

// Email confirmation function
async function sendConfirmationEmail(formData, registrationId) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { camperName, parentName, email } = formData.registrationInfo;
  const selectedSessions = Object.keys(formData.sessions)
    .filter((session) => formData.sessions[session])
    .join(', ');
  const selectedGrade = Object.keys(formData.gradeLevel)
    .filter((grade) => formData.gradeLevel[grade])
    .join(', ');

  const info = await transporter.sendMail({
    from: '"Art Camp" <' + process.env.EMAIL_USER + ">",
    to: email,
    cc: process.env.ADMIN_EMAIL,
    subject: `Serrano Art Camp Registration Confirmation`,
    text: `
        Thank you for registering ${camperName} for Serrano Art Camp, 2025! 
        
        To complete registration and confirm your artist's spot please send registration fee to Molly Serrano thorugh Venmo or Zelle. 
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
          <p>To complete registration and confirm your artist's spot, please send registration fee to Molly Serrano through Venmo or Zelle.</p>
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
            <h3 style="color: #558B87; margin-top: 0;">Payment Options:</h3>
            <ul>
              <li><strong>Venmo:</strong> Molly-Serrano</li>
              <li><strong>Zelle:</strong> (310)-871-5657</li>
            </ul>
          </div>
          <p>I am excited to have your child join me this summer! Please check your email for more info as the camp dates approach.</p>
          <p>Best regards,<br>Mrs. Molly Serrano</p>
        </div>
      `,
  });

  console.log('Email sent:', info.messageId);
}
