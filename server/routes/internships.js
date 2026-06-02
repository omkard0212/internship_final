const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Internship = require('../models/Internship');

// GET all open internships (public listing)
router.get('/', async (req, res) => {
  try {
    const { department, sdg, status } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (sdg) filter.sdgs = sdg;
    if (status === 'all') {
      // no status filter — return all
    } else if (status) {
      filter.status = status;
    } else {
      filter.status = 'open';
    }

    const internships = await Internship.find(filter).sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single internship
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Not found' });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create internship (company only)
router.post('/', auth, async (req, res) => {
  try {
    const user = req.user;
    const internship = new Internship({
      ...req.body,
      companyId: user.userId,
    });
    await internship.save();
    res.status(201).json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update internship status
router.put('/:id', auth, async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!internship) return res.status(404).json({ message: 'Not found' });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
