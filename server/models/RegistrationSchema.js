// models/RegistrationSchema.js
const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  // Parent information
  parentName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  
  // Child information
  childName: {
    type: String,
    required: true
  },
  childGrade: {
    type: String,
    required: true
  },
  
  // Registration details
  weekSelection: {
    type: [String],
    required: true,
    enum: ['June', 'July']
  },
  dietaryNeeds: {
    type: String,
    default: "None"
  },
  allergies: {
    type: String,
    default: "None"
  },
  emergencyContact: {
    type: String,
    required: true
  },
  specialNotes: {
    type: String,
    default: "None"
  },
  
  // Status tracking
  paymentStatus: {
    type: String,
    default: 'Unpaid',
    enum: ['Paid', 'Unpaid']
  },
  registrationStatus: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Confirmed', 'Waitlisted']
  },
  waitlistPosition: {
    type: Number,
    default: null
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Registration', RegistrationSchema);