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
      }
    }
  ]
})

module.exports = mongoose.model('chat', chatSchema)
