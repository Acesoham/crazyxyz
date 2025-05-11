const mongoose = require('mongoose');

const birthCertificateSchema = new mongoose.Schema({
  financialYear: {
    type: String,
    required: true
  },
  childFirstName: {
    type: String,
    required: true
  },
  childMiddleName: String,
  childLastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String, // Changed from Date type to String to match frontend
    required: true
  },
  timeOfBirth: {
    type: String,
    required: true
  },
  fatherFirstName: {
    type: String,
    required: true
  },
  fatherMiddleName: String,
  fatherLastName: {
    type: String,
    required: true
  },
  motherFirstName: {
    type: String,
    required: true
  },
  motherMiddleName: String,
  motherLastName: {
    type: String,
    required: true
  },
  hospitalNameAddress: {
    type: String,
    required: true
  },
  applicantFirstNameEng: {
    type: String,
    required: true
  },
  applicantMiddleNameEng: String,
  applicantLastNameEng: {
    type: String,
    required: true
  },
  applicantFirstNameDev: String, // Not required in the frontend
  applicantMiddleNameDev: String,
  applicantLastNameDev: {
    type: String,
    required: true
  },
  applicantMobileNo: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  noOfCopies: {
    type: String, // Changed to String as the frontend passes it as a string
    required: true
  },
  paymentMethod: { // Changed to match frontend field name
    type: String,
    required: true,
    enum: ['upi', 'netbanking', 'card']
  },
  utrNumber: {
    type: String,
    required: true
  },
  paymentProofPath: { // Changed to match what's stored in server.js
    type: String,
    required: true
  }
});

module.exports = mongoose.model('BirthCertificate', birthCertificateSchema);