const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  position:    { type: String, required: true },
  company:     { type: String, required: true },
  companyId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  department:  { type: String, required: true },
  duration:    { type: String, required: true },
  stipend:     { type: String },
  location:    { type: String },
  description: { type: String },
  deadline:    { type: Date, required: true },
  skills:      [{ type: String }],
  requirements:[{ type: String }],
  sdgs:        [{ type: String }],
  pos:         [{ type: String }],
  peos:        [{ type: String }],
  status:      { type: String, enum: ['open','closed'], default: 'open' },
  approvedByUniversity: { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('Internship', internshipSchema);
