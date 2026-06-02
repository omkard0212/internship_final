const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  studentId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
  position:     { type: String },
  company:      { type: String },
  status: {
    type: String,
    enum: ['Pending','Under Review','Shortlisted','Interview','Accepted','Rejected','Completed','Ongoing'],
    default: 'Pending'
  },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

applicationSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Application', applicationSchema);
