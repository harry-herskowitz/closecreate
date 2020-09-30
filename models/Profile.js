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
      type: String,
      default: 'https://youtube.com/channel/'
    },
    twitter: {
      type: String,
      default: 'https://twitter.com/'
    },
    facebook: {
      type: String,
      default: 'https://facebook.com/'
    },
    linkedin: {
      type: String,
      default: 'https://linkedin.com/in/'
    },
    instagram: {
      type: String,
      default: 'https://instagram.com/'
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('profile', ProfileSchema)
