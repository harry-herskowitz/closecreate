const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const normalize = require('normalize-url')
const checkObjectId = require('../../middleware/checkObjectId')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'picture'])

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', auth, async (req, res) => {
  const {
    location,
    bio,
    instagram,
    youtube,
    spotify,
    bandcamp,
    soundcloud
  } = req.body

  const profileFields = {
    user: req.user.id,
    location,
    bio
  }

  // Build social object and add to profileFields
  const socialfields = { instagram, youtube, spotify, bandcamp, soundcloud }

  for (const [key, value] of Object.entries(socialfields)) {
    if (value && value.length > 0) {
      socialfields[key] = normalize(value, {
        forceHttps: true
      })
      socialfields[key] = socialfields[key] + '/'
    }
  }
  profileFields.social = socialfields

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    )
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    POST api/profile/picture
// @desc     Create or update user profile picture
// @access   Private
router.post('/picture', auth, async (req, res) => {
  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { picture: req.body.filename },
      { new: true, upsert: true }
    )
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find({
      user: { $ne: req.user.id }
    }).populate('user', ['name', 'picture', 'latitude', 'longitude'])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      }).populate('user', ['name', 'picture'])

      if (!profile) return res.status(400).json({ msg: 'Profile not found' })

      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: 'Server error' })
    }
  }
)

// @route    DELETE api/profile
// @desc     Delete profile, user
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id })
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
