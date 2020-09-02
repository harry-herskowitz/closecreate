const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const checkObjectId = require('../../middleware/checkObjectId')

const Chat = require('../../models/Chat')

//get chat by users ids
router.get(
  '/:id1&:id2',
  checkObjectId('id1'),
  checkObjectId('id2'),
  auth,
  async ({ params: { id1, id2 } }, res) => {
    try {
      const chat = await Chat.findOne({
        users: { $in: [id1, id2] }
      })
      return res.json(chat)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ msg: 'Server error' })
    }
  }
)

//Create and update chat by users ids
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { messages } = req.body

  const chatFields = {
    users: [req.params.id1, req.params.id2],
    messages
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    let chat = await Chat.findOneAndUpdate(
      { users: { $in: [req.params.id1, req.params.id2] } },
      { $set: chatFields },
      { new: true, upsert: true }
    )
    res.json(chat)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
