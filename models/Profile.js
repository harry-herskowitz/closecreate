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
    instagram: {
      type: String,
      default: 'https://instagram.com/'
    },
    spotify: {
      type: String,
      default: 'https://open.spotify.com/artist/'
    },
    bandcamp: {
      type: String,
      default: 'https://bandcamp.com/'
    },
    soundcloud: {
      type: String,
      default: 'https://soundcloud.com/'
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('profile', ProfileSchema)
