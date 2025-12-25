const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

const contacts = [];

// Submit contact form
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  const contact = {
    id: contacts.length + 1,
    name,
    email,
    message,
    createdAt: new Date()
  };

  contacts.push(contact);

  res.status(201).json({
    success: true,
    message: 'Contact form submitted successfully',
    data: contact
  });
});

// Get all contacts (admin only)
router.get('/', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: contacts
  });
});

module.exports = router;
