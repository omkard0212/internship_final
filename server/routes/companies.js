const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all companies
router.get('/', auth, async (req, res) => {
  try {
    const companies = await User.find({ userType: 'company' });
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get company by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const company = await User.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update company profile
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, skills } = req.body;
    const company = await User.findByIdAndUpdate(
      req.params.id,
      { name, skills },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 