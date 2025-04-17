const Enquiry = require('../models/Enquiry');


exports.getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.findAll();
        res.status(200).json(enquiries);
    } catch (error) {
        console.error('Error fetching enquiries:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
