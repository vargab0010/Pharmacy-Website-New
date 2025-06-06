const mongoose = require('mongoose');
const crypto = require('crypto');

// 🏠 Address sub-schema
const addressSchema = new mongoose.Schema({
  street: String,
  apt: String,
  city: String,
  state: String,
  post: String,
  district: String,
  zip: String,
  country: String
}, { _id: false });

// 👤 User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  addresses: [addressSchema], // ✅ added address support
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

// 🔑 Method to create reset token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
