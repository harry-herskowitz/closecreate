const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')
const checkObjectId = require('../../middleware/checkObjectId')

const Chat = require('../../models/Chat')

//get chat by users ids
router.get(
  '/:id1&:id2',
  checkObjectId('id1'),
  checkObjectId('id2'),
  auth,
  async (req, res) => {
    try {
      const chat = await Chat.findOne({
        $and: [
          { users: { $in: req.params.id1 } },
          { users: { $in: req.params.id2 } }
        ]
      })
      if (chat) {
        return res.json(chat)
      } else {
        try {
          // Using upsert option (creates new doc if no match is found):
          let chat = await Chat.findOneAndUpdate(
            {
              users: {
                $all: [
                  {
                    $elemMatch: { $eq: mongoose.Types.ObjectId(req.params.id1) }
                  },
                  {
                    $elemMatch: { $eq: mongoose.Types.ObjectId(req.params.id2) }
                  }
                ]
              }
            },
            { $set: { users: [req.params.id1, req.params.id2] } },
            { new: true, upsert: true }
          )
          res.json(chat)
        } catch (err) {
          console.error(err.message)
          res.status(500).send('Server Error')
        }
      }
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: 'Server error' })
    }
  }
)

//Create and update chat by users ids
router.post('/:id1&:id2', auth, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const messages = req.body

  try {
    // Using upsert option (creates new doc if no match is found):
    let chat = await Chat.findOneAndUpdate(
      {
        users: {
          $all: [
            { $elemMatch: { $eq: mongoose.Types.ObjectId(req.params.id1) } },
            { $elemMatch: { $eq: mongoose.Types.ObjectId(req.params.id2) } }
          ]
        }
      },
      { $set: { users: [req.params.id1, req.params.id2], messages } },
      { new: true, upsert: true }
    )
    res.json(chat)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
