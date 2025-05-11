const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getAllApplications,
  getApplication,
  updateStatus
} = require('../controllers/birthCertificateController');

// Submit new birth certificate application
router.post('/', submitApplication);

// Get all birth certificate applications
router.get('/', getAllApplications);

// Get single birth certificate application
router.get('/:id', getApplication);

// Update application status
router.patch('/:id/status', updateStatus);

module.exports = router;