// models/Certificate.js - MongoDB schema for birth certificates
const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  // Child Details
  financialYear: {
    type: String,
    required: true
  },
  childFirstName: {
    type: String,
    required: true
  },
  childMiddleName: {
    type: String
  },
  childLastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  timeOfBirth: {
    type: String,
    required: true
  },
  
  // Parents Details
  fatherFirstName: {
    type: String,
    required: true
  },
  fatherMiddleName: {
    type: String
  },
  fatherLastName: {
    type: String,
    required: true
  },
  motherFirstName: {
    type: String,
    required: true
  },
  motherMiddleName: {
    type: String
  },
  motherLastName: {
    type: String,
    required: true
  },
  hospitalNameAddress: {
    type: String,
    required: true
  },
  
  // Applicant Details
  applicantFirstNameEng: {
    type: String,
    required: true
  },
  applicantMiddleNameEng: {
    type: String
  },
  applicantLastNameEng: {
    type: String,
    required: true
  },
  applicantFirstNameDev: {
    type: String
  },
  applicantMiddleNameDev: {
    type: String
  },
  applicantLastNameDev: {
    type: String,
    required: true
  },
  applicantMobileNo: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  noOfCopies: {
    type: Number,
    required: true
  },
  
  // Payment Details
  paymentOption: {
    type: String,
    required: true,
    enum: ['upi', 'netbanking', 'card']
  },
  paymentProof: {
    type: String,  // File path
    required: true
  },
  utrNumber: {
    type: String,
    required: true
  },
  
  // Metadata
  applicationStatus: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Processing', 'Approved', 'Rejected']
  },
  applicationId: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate a unique application ID before saving
CertificateSchema.pre('save', async function(next) {
  if (!this.applicationId) {
    // Format: BC-YEAR-XXXX (e.g., BC-2025-0001)
    const currentYear = new Date().getFullYear();
    const count = await this.constructor.countDocuments({
      createdAt: {
        $gte: new Date(`${currentYear}-01-01`),
        $lte: new Date(`${currentYear}-12-31`)
      }
    });
    
    this.applicationId = `BC-${currentYear}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Certificate', CertificateSchema);