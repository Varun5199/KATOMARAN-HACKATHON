const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String }, // Optional if using OAuth
  oauthProvider: { type: String }, // 'google', 'github', etc.
  oauthId:       { type: String }  // ID from OAuth provider
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
