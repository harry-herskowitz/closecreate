const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  messages: [
    {
      body: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      date: { type: Date, default: Date.now }
    }
  ]
})

module.exports = mongoose.model('chat', chatSchema)
