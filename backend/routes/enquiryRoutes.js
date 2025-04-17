const express = require('express');
const router = express.Router();
const EnquiryController = require('../controllers/enquiryController');



router.get('/', EnquiryController.getAllEnquiries); // Get all enquiries


module.exports = router;