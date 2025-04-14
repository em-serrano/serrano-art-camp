const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  childName: {
    type: String,
    required: true
  },
  childGrade: {
    type: String,
    required: true
  },
  weekSelection: {
    type: String,
    enum: ['June', 'July'],
    required: true
  },
  dietaryNeeds: {
    type: String,
    default: 'None'
  },
  allergies: {
    type: String,
    default: 'None'
  },
  emergencyContact: {
    type: String,
    required: true
  },
  specialNotes: {
    type: String,
    default: 'None'
  },
  paymentStatus: {
    type: String,
    enum: ['Unpaid', 'Paid'],
    default: 'Unpaid'
  },
  registrationStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Waitlisted'],
    default: 'Pending'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Registration', RegistrationSchema);