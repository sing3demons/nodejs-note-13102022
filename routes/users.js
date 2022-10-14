const { Router } = require('express')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const passportJWT = require('../middleware/passportJWT.js')

const router = Router()

router.get('/me', [passportJWT.isLogin], async (req, res) => {
  const result = req.user

  res.status(200).json({
    resultCode: 20000,
    resultDescription: 'find all users',
    resultData: result,
  })
})

//localhost:3000/api/users
router.get(
  '/',
  [passportJWT.isLogin, passportJWT.checkAdmin],
  async (req, res) => {
    const users = await User.find({})

    //   let result = []
    //   for (let user of users) {
    //     result.push({
    //       id: user._id,
    //       email: user.email,
    //       first_name: user.fistName,
    //       last: user.lastName,
    //       role: user.role,
    //     })
    //   }

    const result = users.map((user) => {
      return {
        id: user._id,
        email: user.email,
        first_name: user.fistName,
        last: user.lastName,
        role: user.role,
      }
    })

    res.status(200).json({
      resultCode: 20000,
      resultDescription: 'find all users',
      resultData: result,
    })
  }
)

//localhost:3000/api/users/register
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body

  const exitsEmail = await User.findOne({ email: email })
  if (exitsEmail) {
    return res.status(400).json({
      resultCode: 40000,
      resultDescription: 'email duplicate',
    })
  }

  const user = new User()
  user.fistName = first_name
  user.lastName = last_name
  user.email = email
  user.password = await user.encryptPassword(password)
  await user.save()

  res.status(201).json({
    resultCode: 20100,
    resultDescription: 'create user',
    resultData: user,
  })
})

//localhost:3000/api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  if (!user) {
    return res.status(400).json({
      resultCode: 40000,
      resultDescription: 'error',
      resultData: 'email or password invalid',
    })
  }

  const isValid = await user.checkPassword(password)
  if (!isValid) {
    return res.status(400).json({
      resultCode: 40000,
      resultDescription: 'error',
      resultData: 'email or password invalid',
    })
  }

  const token = jwt.sign(
    {
      sub: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )

  res.status(200).json({
    resultCode: 20000,
    resultDescription: 'login',
    resultData: { token },
  })
})

module.exports = router
