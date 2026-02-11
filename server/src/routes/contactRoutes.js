const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/contactController');

router.route('/')
    .get(getContacts)
    .post(createContact);

module.exports = router;
