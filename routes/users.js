const { Router } = require('express')

const passportJWT = require('../middleware/passportJWT.js')
const userController = require('../controllers/userController.js')
const router = Router()

router.get('/me', [passportJWT.isLogin], userController.me)

//localhost:3000/api/users
router.get(
  '/',
  [passportJWT.isLogin, passportJWT.checkAdmin],
  userController.findAllUsers
)

//localhost:3000/api/auth/register
router.post('/register', userController.register)

//localhost:3000/api/auth/login
router.post('/login', userController.login)

module.exports = router
