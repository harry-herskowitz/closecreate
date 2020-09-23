const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  picture: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('profile', ProfileSchema)
