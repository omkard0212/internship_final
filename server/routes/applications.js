const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Internship = require('../models/Internship');

// GET my applications (student)
router.get('/my', auth, async (req, res) => {
  try {
    const apps = await Application.find({ studentId: req.user.userId })
      .populate('internshipId', 'position company department duration deadline sdgs skills')
      .sort({ appliedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET applications for a company's internships
router.get('/company', auth, async (req, res) => {
  try {
    const internships = await Internship.find({ companyId: req.user.userId }).select('_id');
    const ids = internships.map(i => i._id);
    const apps = await Application.find({ internshipId: { $in: ids } })
      .populate('studentId', 'name email department skills college gpa')
      .populate('internshipId', 'position company')
      .sort({ appliedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all applications (university/admin)
router.get('/all', auth, async (req, res) => {
  try {
    const apps = await Application.find()
      .populate('studentId', 'name email department')
      .populate('internshipId', 'position company')
      .sort({ appliedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST apply to internship (student)
router.post('/', auth, async (req, res) => {
  try {
    const { internshipId } = req.body;
    const existing = await Application.findOne({ studentId: req.user.userId, internshipId });
    if (existing) return res.status(400).json({ message: 'Already applied' });

    const internship = await Internship.findById(internshipId);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });

    const app = new Application({
      studentId: req.user.userId,
      internshipId,
      position: internship.position,
      company: internship.company,
    });
    await app.save();
    await Internship.findByIdAndUpdate(internshipId, { $inc: { applicants: 1 } });
    res.status(201).json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update application status (company/university)
router.put('/:id', auth, async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: Date.now() },
      { new: true }
    );
    if (!app) return res.status(404).json({ message: 'Not found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE withdraw application (student)
router.delete('/:id', auth, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    // Verify ownership
    if (app.studentId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (['Accepted','Completed','Ongoing'].includes(app.status)) {
      return res.status(400).json({ message: 'Cannot withdraw an accepted or active application' });
    }

    await Application.findByIdAndDelete(req.params.id);
    await Internship.findByIdAndUpdate(app.internshipId, { $inc: { applicants: -1 } });
    res.json({ message: 'Application withdrawn' });
  } catch (err) {
    console.error('Withdraw error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
