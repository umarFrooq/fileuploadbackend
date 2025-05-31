// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  provider: { type: String, enum: ['google', 'local', 'facebook', 'apple'], default: 'local' },
  providerId: { type: String },
  avatar: { type: String }, // To store profile picture from Google
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);