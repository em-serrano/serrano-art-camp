import React, { useReducer, useState } from "react";
import Navigation from "../components/Nav";
import Footer from "../components/Footer";
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
  FaTimes,
} from "react-icons/fa";

// Simple Modal Component
const Modal = ({ show, onHide, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ closeButton, children }) => (
  <div className="flex justify-between items-center p-4 border-b">
    {children}
    {closeButton && (
      <button
        onClick={() => {
          /* Will be handled by parent */
        }}
        className="text-gray-500 hover:text-gray-700"
      >
        <FaTimes />
      </button>
    )}
  </div>
);

const ModalTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-gray-900">{children}</h3>
);

const ModalBody = ({ children }) => <div className="p-4">{children}</div>;

const ModalFooter = ({ children }) => (
  <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">
    {children}
  </div>
);

const Button = ({ variant = "primary", onClick, children }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

// SectionHeader component
const SectionHeader = ({ icon, title, description, style }) => (
  <div className="text-center mb-8">
    <div className="flex items-center justify-center mb-2" style={style}>
      {icon}
      <h2 className="text-3xl font-bold ml-2">{title}</h2>
    </div>
    <p className="text-gray-600 text-lg">{description}</p>
  </div>
);

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
  const hasError = touched && error;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            hasError ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows="3"
        />
      ) : (
        <input
          type={type}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            hasError ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hasError && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

// PreferenceCard component
const PreferenceCard = ({
  item,
  selected,
  onClick,
  icon,
  disabled,
  isFull,
}) => {
  return (
    <div
      className={`
        flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
        ${
          selected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-gray-300"
        }
        ${disabled ? "cursor-not-allowed opacity-60" : ""}
        ${isFull ? "line-through" : ""}
      `}
      onClick={disabled ? undefined : onClick}
    >
      <div className="text-blue-600 mr-3 text-lg">{icon}</div>
      <span className="text-gray-800">
        {item}
        {isFull && <span className="text-red-500 font-medium"> (FULL)</span>}
      </span>
    </div>
  );
};

// Initial state
const initialState = {
  sessions: {
    "Week 1: Back to Nature (June 9-13)": false,
    "Week 2: Dots and Lines (July 7-11)": false,
  },
  fullSessions: {
    "Week 1: Back to Nature (June 9-13)": true,
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

// Mock API Service for demo
const ApiService = {
  submitRegistration: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  },
};

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

  const handleToggle = (section, item) => {
    if (
      section === "sessions" &&
      preferences.fullSessions &&
      preferences.fullSessions[item]
    ) {
      return;
    }

    dispatch({ type: "TOGGLE_PREFERENCE", section, item });
  };

  const updateRegistrationInfo = (field, value) => {
    dispatch({
      type: "UPDATE_REGISTRATION",
      field,
      value,
    });

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

    for (const field of requiredFields) {
      const fieldValue = preferences.registrationInfo[field];
      const isFieldValid = validateRequired(fieldValue, field);
      isValid = isValid && isFieldValid;

      if (field === "email" && fieldValue) {
        isValid = isValid && validateEmail(fieldValue);
      } else if (field === "contactNumber" && fieldValue) {
        isValid = isValid && validatePhone(fieldValue);
      }

      dispatch({ type: "SET_TOUCHED", field });
    }

    const selectionsValid = validateSelections();
    isValid = isValid && selectionsValid;

    if (!preferences.registrationInfo.agreedToTerms) {
      isValid = false;
    }

    return isValid;
  };

  const submitRegistration = async () => {
    setFormSubmitted(true);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await ApiService.submitRegistration(preferences);

      setIsSubmitting(false);
      setSubmitStatus("submitted");
      setShowSuccessModal(true);

      dispatch({ type: "RESET_FORM" });
      setFormSubmitted(false);

      setTimeout(() => {
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus("error");
      alert(`Registration error: ${error.message}`);

      setTimeout(() => {
        setSubmitStatus(null);
      }, 2000);
    }
    return initialState;
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navigation />
      </div>
      <section className="py-16 px-4 bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_80%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="max-w-6xl mx-auto py-10">
          <SectionHeader
            icon={<FaPalette />}
            title="Art Camp Registration"
            style={{
              color: "#8B5CF6",
            }}
            description="Secure your young artist's spot for Summer 2025"
          />

          <div className="space-y-8">
            {/* Camper Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <FaUserAlt className="mr-2 text-blue-600" /> Camper Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  onChange={(val) =>
                    updateRegistrationInfo("contactNumber", val)
                  }
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

                <div className="md:col-span-2">
                  <InputField
                    label="Emergency Contact"
                    placeholder="Name & Phone Number"
                    value={preferences.registrationInfo.emergencyContact}
                    onChange={(val) =>
                      updateRegistrationInfo("emergencyContact", val)
                    }
                    required
                    error={preferences.errors.emergencyContact}
                    touched={
                      preferences.touched.emergencyContact || formSubmitted
                    }
                  />
                </div>
              </div>
            </div>

            {/* Grade Level Selection */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <FaGraduationCap className="mr-2 text-blue-600" /> Grade Level
                (Fall 2025)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div className="text-sm text-gray-600 mt-2">
                Art Camp is for rising 2nd - 5th graders
              </div>
              {(preferences.touched.gradeLevel || formSubmitted) &&
                preferences.errors.gradeLevel && (
                  <div className="text-red-500 text-sm mt-2">
                    {preferences.errors.gradeLevel}
                  </div>
                )}
            </div>

            {/* Camp Session Selection */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <FaCalendarAlt className="mr-2 text-blue-600" /> Camp Sessions
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.keys(preferences.sessions).map((session) => (
                  <PreferenceCard
                    key={session}
                    item={session}
                    selected={preferences.sessions[session]}
                    onClick={() => handleToggle("sessions", session)}
                    icon={<FaCalendarDay />}
                    disabled={preferences.fullSessions[session]}
                    isFull={preferences.fullSessions[session]}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Select all weeks you'd like to attend - $250 per week
              </div>
              <div className="text-sm text-gray-600">
                *$450 for campers attending both sessions
              </div>
              {(preferences.touched.sessions || formSubmitted) &&
                preferences.errors.sessions && (
                  <div className="text-red-500 text-sm mt-2">
                    {preferences.errors.sessions}
                  </div>
                )}
            </div>

            {/* Medical Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <FaFirstAid className="mr-2 text-blue-600" /> Health Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  onChange={(val) =>
                    updateRegistrationInfo("dietaryNotes", val)
                  }
                  type="textarea"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <FaInfoCircle className="mr-2 text-blue-600" /> Additional
                Information
              </h3>
              <InputField
                label="Special Needs/Notes"
                placeholder="Anything else I should know about your child?"
                value={preferences.registrationInfo.specialNeeds}
                onChange={(val) => updateRegistrationInfo("specialNeeds", val)}
                type="textarea"
              />
            </div>

            {/* Terms and Submit */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms-agreement"
                    checked={preferences.registrationInfo.agreedToTerms}
                    onChange={(e) =>
                      updateRegistrationInfo("agreedToTerms", e.target.checked)
                    }
                    className={`mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                      formSubmitted &&
                      !preferences.registrationInfo.agreedToTerms
                        ? "border-red-500"
                        : ""
                    }`}
                    required
                  />
                  <label
                    htmlFor="terms-agreement"
                    className="text-sm text-gray-700"
                  >
                    I understand that my artist's spot is not confirmed until I
                    pay the registration fee of $250. Weekly sessions are
                    limited to 15 artists on a first-come, first-served basis. I
                    agree that my child may participate in the Friday art show
                    and that photos may be taken for educational and promotional
                    purposes.
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                </div>
                {formSubmitted &&
                  !preferences.registrationInfo.agreedToTerms && (
                    <div className="text-red-500 text-sm mt-2">
                      You must agree to the terms to continue
                    </div>
                  )}
              </div>

              <button
                type="button"
                onClick={submitRegistration}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : submitStatus === "submitted"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin inline mr-2" />{" "}
                    Processing...
                  </>
                ) : submitStatus === "submitted" ? (
                  <>
                    <FaCheck className="inline mr-2" /> Registration Submitted
                  </>
                ) : (
                  "Register for Art Camp"
                )}
              </button>
            </div>
          </div>

          {/* Success Modal */}
          <Modal
            show={showSuccessModal}
            onHide={() => setShowSuccessModal(false)}
          >
            <ModalHeader closeButton>
              <ModalTitle>Registration Success!</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p className="text-gray-700">
                Thank you for registering! Please check your email for
                confirmation and payment details.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="primary"
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </section>
      <Footer />
    </>
  );
}
