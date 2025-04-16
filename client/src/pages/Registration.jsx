import React, { useReducer, useState } from "react";
import {
  FaUserAlt,
  FaInfoCircle,
  FaCalendarAlt,
  FaPalette,
  FaFirstAid,
  FaAllergies,
  FaCalendarDay,
  FaSpinner,
  FaCheck,
  FaGraduationCap,
} from "react-icons/fa";
import { SectionHeader } from "../components/SectionHeader";
import { ApiService } from "../../../server/services/api";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// InputField component with validation
const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  error = "",
  touched = false,
}) => {
  return (
    <div className="input-field">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          className={`form-control ${touched && error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className={`form-control ${touched && error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {touched && error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

// PreferenceCard component
const PreferenceCard = ({ item, selected, onClick, icon }) => {
  return (
    <div
      className={`preference-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="card-icon">{icon}</div>
      <span>{item}</span>
    </div>
  );
};

// Initial state
const initialState = {
  sessions: {
    "Week 1: Back to Nature (June 9-13)": false,
    "Week 2: Dots and Lines (July 7-11)": false,
  },
  gradeLevel: {
    "2nd Grade": false,
    "3rd Grade": false,
    "4th Grade": false,
    "5th Grade": false,
  },
  dietaryNeeds: {
    None: false,
    Vegetarian: false,
    "Gluten-Free": false,
    "Nut-Free": false,
    Other: false,
  },
  registrationInfo: {
    camperName: "",
    parentName: "",
    contactNumber: "",
    email: "",
    emergencyContact: "",
    allergies: "",
    dietaryNotes: "",
    specialNeeds: "",
    agreedToTerms: false,
  },
  errors: {
    camperName: "",
    parentName: "",
    contactNumber: "",
    email: "",
    emergencyContact: "",
    sessions: "",
    gradeLevel: "",
  },
  touched: {
    camperName: false,
    parentName: false,
    contactNumber: false,
    email: false,
    emergencyContact: false,
    sessions: false,
    gradeLevel: false,
  },
};

// Reducer function
function campPreferencesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_PREFERENCE":
      if (action.section === "gradeLevel") {
        return {
          ...state,
          gradeLevel: {
            [action.item]: true,
          },
          touched: {
            ...state.touched,
            [action.section]: true,
          },
        };
      }
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.item]: !state[action.section][action.item],
        },
        touched: {
          ...state.touched,
          [action.section]: true,
        },
      };

    case "UPDATE_REGISTRATION":
      return {
        ...state,
        registrationInfo: {
          ...state.registrationInfo,
          [action.field]: action.value,
        },
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };

    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message,
        },
      };

    case "SET_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

export default function Registration() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [preferences, dispatch] = useReducer(
    campPreferencesReducer,
    initialState
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Validation functions
  const validateRequired = (value, fieldName) => {
    if (!value || value.trim() === "") {
      dispatch({
        type: "SET_ERROR",
        field: fieldName,
        message: "This field is required",
      });
      return false;
    }
    dispatch({ type: "SET_ERROR", field: fieldName, message: "" });
    return true;
  };

  const validateEmail = (email) => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      dispatch({
        type: "SET_ERROR",
        field: "email",
        message: "Please enter a valid email address",
      });
      return false;
    }
    dispatch({ type: "SET_ERROR", field: "email", message: "" });
    return true;
  };

  const validatePhone = (phone) => {
    // Basic phone validation
    const phoneValid = /^[\d\s\-\(\)]+$/.test(phone);
    if (!phoneValid) {
      dispatch({
        type: "SET_ERROR",
        field: "contactNumber",
        message: "Please enter a valid phone number",
      });
      return false;
    }
    dispatch({ type: "SET_ERROR", field: "contactNumber", message: "" });
    return true;
  };

  const validateSelections = () => {
    // Check if at least one session is selected
    const sessionSelected = Object.values(preferences.sessions).some(
      (val) => val
    );
    if (!sessionSelected) {
      dispatch({
        type: "SET_ERROR",
        field: "sessions",
        message: "Please select at least one camp session",
      });
      dispatch({ type: "SET_TOUCHED", field: "sessions" });
    } else {
      dispatch({ type: "SET_ERROR", field: "sessions", message: "" });
    }

    // Check if grade level is selected
    const gradeSelected = Object.values(preferences.gradeLevel).some(
      (val) => val
    );
    if (!gradeSelected) {
      dispatch({
        type: "SET_ERROR",
        field: "gradeLevel",
        message: "Please select a grade level",
      });
      dispatch({ type: "SET_TOUCHED", field: "gradeLevel" });
    } else {
      dispatch({ type: "SET_ERROR", field: "gradeLevel", message: "" });
    }

    return sessionSelected && gradeSelected;
  };

  // Handlers
  const handleToggle = (section, item) => {
    dispatch({ type: "TOGGLE_PREFERENCE", section, item });
  };

  const updateRegistrationInfo = (field, value) => {
    dispatch({
      type: "UPDATE_REGISTRATION",
      field,
      value,
    });

    // Validate on change for immediate feedback
    if (field === "email" && value) {
      validateEmail(value);
    } else if (field === "contactNumber" && value) {
      validatePhone(value);
    } else if (
      field === "camperName" ||
      field === "parentName" ||
      field === "emergencyContact"
    ) {
      validateRequired(value, field);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "camperName",
      "parentName",
      "contactNumber",
      "email",
      "emergencyContact",
    ];
    let isValid = true;

    // Validate required text fields
    for (const field of requiredFields) {
      const fieldValue = preferences.registrationInfo[field];
      const isFieldValid = validateRequired(fieldValue, field);
      isValid = isValid && isFieldValid;

      // Additional validation for email and phone
      if (field === "email" && fieldValue) {
        isValid = isValid && validateEmail(fieldValue);
      } else if (field === "contactNumber" && fieldValue) {
        isValid = isValid && validatePhone(fieldValue);
      }

      // Mark field as touched
      dispatch({ type: "SET_TOUCHED", field });
    }

    // Validate selections (sessions and grade level)
    const selectionsValid = validateSelections();
    isValid = isValid && selectionsValid;

    // Check terms agreement
    if (!preferences.registrationInfo.agreedToTerms) {
      isValid = false;
    }

    return isValid;
  };

  // Then update the submitRegistration function:
  const submitRegistration = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!validateForm()) {
      return; // Don't submit if validation fails
    }

    setIsSubmitting(true);

    try {
      const response = await ApiService.submitRegistration(preferences);

      setIsSubmitting(false);
      setSubmitStatus("submitted");
      setShowSuccessModal(true);
      // Show success message

      // Reset form data after successful submission
      dispatch({ type: "RESET_FORM" });

      // Reset formSubmitted state so validation doesn't show errors on the empty form
      setFormSubmitted(false);

      // Reset after success message
      setTimeout(() => {
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus("error");
      alert(`Registration error: ${error.message}`);

      // Reset error state
      setTimeout(() => {
        setSubmitStatus(null);
      }, 2000);
    }
    return initialState;
  };

  return (
    <section className="registration-section p-3">
      <SectionHeader
        icon={<FaPalette />}
        title=" Art Camp Registration"
        style={{
          color: "var(--accent-color)",
        }}
        description="Secure your young artist's spot for Summer 2025"
      />

      <form className="registration-form" onSubmit={submitRegistration}>
        {/* Camper Information */}
        <div className="form-section camper--information">
          <h3>
            <FaUserAlt className="section-icon" /> Camper Information
          </h3>

          <div className="input-grid">
            <InputField
              label="Camper's Full Name"
              placeholder="First and Last Name"
              value={preferences.registrationInfo.camperName}
              onChange={(val) => updateRegistrationInfo("camperName", val)}
              required
              error={preferences.errors.camperName}
              touched={preferences.touched.camperName || formSubmitted}
            />

            <InputField
              label="Parent/Guardian Name"
              placeholder="First and Last Name"
              value={preferences.registrationInfo.parentName}
              onChange={(val) => updateRegistrationInfo("parentName", val)}
              required
              error={preferences.errors.parentName}
              touched={preferences.touched.parentName || formSubmitted}
            />

            <InputField
              label="Contact Number"
              placeholder="(123) 456-7890"
              value={preferences.registrationInfo.contactNumber}
              onChange={(val) => updateRegistrationInfo("contactNumber", val)}
              type="tel"
              required
              error={preferences.errors.contactNumber}
              touched={preferences.touched.contactNumber || formSubmitted}
            />

            <InputField
              label="Email Address"
              placeholder="your@email.com"
              value={preferences.registrationInfo.email}
              onChange={(val) => updateRegistrationInfo("email", val)}
              type="email"
              required
              error={preferences.errors.email}
              touched={preferences.touched.email || formSubmitted}
            />

            <InputField
              label="Emergency Contact"
              placeholder="Name & Phone Number"
              value={preferences.registrationInfo.emergencyContact}
              onChange={(val) =>
                updateRegistrationInfo("emergencyContact", val)
              }
              required
              error={preferences.errors.emergencyContact}
              touched={preferences.touched.emergencyContact || formSubmitted}
            />
          </div>
        </div>

        {/* Grade Level Selection */}
        <div className="form-section">
          <h3>
            <FaGraduationCap className="section-icon" /> Grade Level (Fall 2025)
          </h3>
          <div className="preference-options">
            {Object.keys(preferences.gradeLevel).map((grade) => (
              <PreferenceCard
                key={grade}
                item={grade}
                selected={preferences.gradeLevel[grade]}
                onClick={() => handleToggle("gradeLevel", grade)}
                icon={<FaGraduationCap />}
              />
            ))}
          </div>
          <div className="form-note">
            Art Camp is for rising 2nd - 5th graders
          </div>
          {(preferences.touched.gradeLevel || formSubmitted) &&
            preferences.errors.gradeLevel && (
              <div className="validation-error">
                {preferences.errors.gradeLevel}
              </div>
            )}
        </div>

        {/* Camp Session Selection */}
        <div className="form-section">
          <h3>
            <FaCalendarAlt className="section-icon" /> Camp Sessions
          </h3>
          <div className="preference-options">
            {Object.keys(preferences.sessions).map((session) => (
              <PreferenceCard
                key={session}
                item={session}
                selected={preferences.sessions[session]}
                onClick={() => handleToggle("sessions", session)}
                icon={<FaCalendarDay />}
              />
            ))}
          </div>
          <div className="form-note">
            Select all weeks you'd like to attend - $250 per week
          </div>
          <div className="form-note">
            *$450 for campers attending both sessions
          </div>
          {(preferences.touched.sessions || formSubmitted) &&
            preferences.errors.sessions && (
              <div className="validation-error">
                {preferences.errors.sessions}
              </div>
            )}
        </div>

        {/* Medical Information */}
        <div className="form-section">
          <h3>
            <FaFirstAid className="section-icon" /> Health Information
          </h3>

          <div className="input-grid">
            <InputField
              label="Allergies"
              placeholder="List any allergies"
              value={preferences.registrationInfo.allergies}
              onChange={(val) => updateRegistrationInfo("allergies", val)}
              type="textarea"
            />

            <InputField
              label="Dietary Needs"
              placeholder="Any special dietary requirements?"
              value={preferences.registrationInfo.dietaryNotes}
              onChange={(val) => updateRegistrationInfo("dietaryNotes", val)}
              type="textarea"
            />
          </div>

          <div className="preference-options">
            {Object.keys(preferences.dietaryNeeds).map((need) => (
              <PreferenceCard
                key={need}
                item={need}
                selected={preferences.dietaryNeeds[need]}
                onClick={() => handleToggle("dietaryNeeds", need)}
                icon={<FaAllergies />}
              />
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h3>
            <FaInfoCircle className="section-icon" /> Additional Information
          </h3>
          <InputField
            label="Special Needs/Notes"
            placeholder="Anything else we should know about your child?"
            value={preferences.registrationInfo.specialNeeds}
            onChange={(val) => updateRegistrationInfo("specialNeeds", val)}
            type="textarea"
          />
        </div>

        {/* Terms and Submit */}
        <div className="form-section terms-section">
          <div className="terms-agreement">
            <input
              type="checkbox"
              id="terms-agreement"
              checked={preferences.registrationInfo.agreedToTerms}
              onChange={(e) =>
                updateRegistrationInfo("agreedToTerms", e.target.checked)
              }
              className={
                formSubmitted && !preferences.registrationInfo.agreedToTerms
                  ? "is-invalid"
                  : ""
              }
              required
            />
            <label htmlFor="terms-agreement">
              I understand that my artist's spot is not confirmed until I pay
              the registration fee of $250. Weekly sessions are limited to 15
              artists on a first-come, first-served basis. I agree that my child
              may participate in the Friday art show and that photos may be
              taken for educational and promotional purposes.
              <span className="required">*</span>
            </label>
            {formSubmitted && !preferences.registrationInfo.agreedToTerms && (
              <div className="invalid-feedback d-block">
                You must agree to the terms to continue
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`submit-registration-btn ${
              isSubmitting ? "submitting" : ""
            } ${submitStatus ? submitStatus : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="spin" /> Processing...
              </>
            ) : submitStatus === "submitted" ? (
              <>
                <FaCheck /> Registration Submitted
              </>
            ) : (
              "Register for Art Camp"
            )}
          </button>
        </div>
      </form>
      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Thank you for registering! Please check your email for confirmation
            and payment details.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
