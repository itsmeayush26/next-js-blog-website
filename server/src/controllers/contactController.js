const Contact = require('../models/Contact');

// @desc    Create new contact inquiry
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res, next) => {
    try {
        const contact = await Contact.create(req.body);

        res.status(201).json({
            success: true,
            data: contact
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// @desc    Get all contact inquiries (Admin)
// @route   GET /api/contact
// @access  Public (for now)
exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};
