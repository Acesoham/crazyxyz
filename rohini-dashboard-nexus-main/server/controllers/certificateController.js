// controllers/certificateController.js - Handler functions for certificate routes
const Certificate = require('../models/Certificate');
const path = require('path');
const fs = require('fs');

// @desc    Create a new certificate application
// @route   POST /api/certificates
// @access  Public
exports.createCertificate = async (req, res) => {
  try {
    // Get form data from request body
    const formData = req.body;
    
    // Handle file upload
    if (!req.file) {
      return res.status(400).json({ message: 'Payment proof is required' });
    }
    
    // Create new certificate with file path
    const certificate = new Certificate({
      ...formData,
      paymentProof: req.file.path
    });
    
    // Save certificate to database
    const savedCertificate = await certificate.save();
    
    res.status(201).json({
      success: true,
      data: savedCertificate,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error(error);
    
    // Check for validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get certificate application by ID
// @route   GET /api/certificates/:id
// @access  Public
exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get certificate application by application ID
// @route   GET /api/certificates/application/:applicationId
// @access  Public
exports.getCertificateByApplicationId = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ 
      applicationId: req.params.applicationId 
    });
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update certificate application status
// @route   PUT /api/certificates/:id
// @access  Admin (would need auth middleware in production)
exports.updateCertificateStatus = async (req, res) => {
  try {
    const { applicationStatus } = req.body;
    
    // Check if status is valid
    if (!['Pending', 'Processing', 'Approved', 'Rejected'].includes(applicationStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid application status'
      });
    }
    
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      { applicationStatus },
      { new: true, runValidators: true }
    );
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};