const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['student', 'company', 'university'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  bio: {
    type: String
  },
  linkedin: {
    type: String
  },
  // Student specific fields
  college: {
    type: String
  },
  degree: {
    type: String
  },
  graduationYear: {
    type: String
  },
  skills: [{
    type: String
  }],
  // Company specific fields
  industry: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  // University specific fields
  address: {
    type: String
  },
  accreditation: {
    type: String
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  completedInternships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship'
  }],
  ongoingInternships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 