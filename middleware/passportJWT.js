const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}

const User = require('../models/User.js')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = '9C07B82A-6930-474D-90BD-FAFED04EB017'

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.sub)
      if (!user) {
        return done(err, null)
      }

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

module.exports.isLogin = passport.authenticate('jwt', { session: false })
