const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all universities
router.get('/', auth, async (req, res) => {
  try {
    const universities = await User.find({ userType: 'university' });
    res.json(universities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get university by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const university = await User.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.json(university);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update university profile
router.put('/:id', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const university = await User.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.json(university);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 