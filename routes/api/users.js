const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const normalize = require('normalize-url')
const checkObjectId = require('../../middleware/checkObjectId')
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      )

      user = new User({
        name,
        email,
        avatar,
        password
      })

      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route    POST api/users/request/:user_id
// @desc     Add request to user
// @access   Public

router.post(
  '/request/:user_id',
  [auth, checkObjectId('user_id')],
  async (req, res) => {
    try {
      const currentUser = await User.findById(req.user.id).select('-password')
      const requestedUser = await User.findById(req.params.user_id).select(
        '-password'
      )
      if (currentUser.outgoingRequests.includes(req.params.user_id))
        return res.status(400).json({ msg: 'User already requested' })
      currentUser.outgoingRequests.unshift(req.params.user_id)
      await currentUser.save()
      requestedUser.incomingRequests.unshift(req.params.user_id)
      await requestedUser.save()
      res.json({ msg: 'Collab Request Sent' })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

// @route    POST api/users/match/:user_id
// @desc     Add request to user
// @access   Public

router.post(
  '/match/:user_id',
  [auth, checkObjectId('user_id')],
  async (req, res) => {
    try {
      const currentUser = await User.findById(req.user.id).select('-password')
      const requestedUser = await User.findById(req.params.user_id).select(
        '-password'
      )
      currentUser.matches.unshift(req.params.user_id)
      await currentUser.save()
      requestedUser.matches.unshift(req.params.user_id)
      await requestedUser.save()
      res.json({ msg: 'Collab Request Accepted' })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
