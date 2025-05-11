const BirthCertificate = require('../models/BirthCertificate');

// Submit new birth certificate application
exports.submitApplication = async (req, res) => {
  try {
    // Create birth certificate from request body
    // The IDs in the frontend form will ensure the correct properties are sent
    const birthCertificate = new BirthCertificate(req.body);
    await birthCertificate.save();
    
    res.status(201).json({
      success: true,
      data: birthCertificate,
      message: 'Birth certificate application submitted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all birth certificate applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await BirthCertificate.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get single birth certificate application
exports.getApplication = async (req, res) => {
  try {
    const application = await BirthCertificate.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }
    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update application status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await BirthCertificate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};