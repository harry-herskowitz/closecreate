const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  matches: {
    type: [String]
  },
  outgoingRequests: {
    type: [String]
  },
  incomingRequests: {
    type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  }
})

module.exports = mongoose.model('user', UserSchema)
