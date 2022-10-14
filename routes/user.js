const { Router } = require('express')

const router = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isLogin, imAdmin } = require('../middleware/passportJWT.js')
const User = require('../models/User.js')

router.get('/', [isLogin, imAdmin], async (req, res) => {
  try {
    const result = await User.find({})

    res.status(200).json({
      resultCode: 20000,
      resultDescription: 'find all users',
      resultData: result,
    })
  } catch (error) {
    res.status(500).json({
      resultCode: 50000,
      resultDescription: 'error',
      resultData: error,
    })
  }
})

router.post('/', async (req, res) => {
  const { name, email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    return res.status(400).json({
      resultCode: 40000,
      resultDescription: 'email duplicate',
    })
  }

  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(password, salt)
  const result = await User.create({
    name,
    email,
    password: hash,
  })

  res.status(201).json({
    resultCode: 20100,
    resultData: result,
  })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).json({
      resultCode: 40400,
      resultDescription: 'email or password invalid',
    })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return res.status(400).json({
      resultCode: 40000,
      resultDescription: 'email or password invalid',
    })
  }

  const token = jwt.sign(
    { sub: user._id },
    '9C07B82A-6930-474D-90BD-FAFED04EB017',
    {
      expiresIn: '1h',
    }
  )

  res.status(200).json({
    resultCode: 20000,
    resultDescription: 'login success',
    resultData: { token },
  })
})

router.get('/me', [isLogin], async (req, res) => {
  try {
    const result = req.user

    res.status(200).json({
      resultCode: 20000,
      resultDescription: 'find all users',
      resultData: result,
    })
  } catch (error) {
    res.status(500).json({
      resultCode: 50000,
      resultDescription: 'error',
      resultData: error,
    })
  }
})

module.exports = router
