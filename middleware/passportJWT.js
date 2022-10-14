const passport = require('passport')
const User = require('../models/User.js')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.sub)
      if (!user) return done(err, null)

      return done(null, user)
    } catch (error) {
      res.status(500).json({
        resultCode: 50000,
        resultDescription: 'error',
        resultData: error,
      })
    }
  })
)

const isLogin = passport.authenticate('jwt', { session: false })
module.exports = { isLogin }

module.exports.checkAdmin = (req, res, next) => {
  const { role } = req.user
  if (role !== 'admin') {
    return res.status(403).json({
      resultCode: 40300,
      resultDescription: 'forbidden',
    })
  }

  next()
}
