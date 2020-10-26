const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User document schema w/datatypes and constraints
const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema);