const JwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { jwt } = require('../environments/environment');
const { jwtMessages } = require('../constants/messages');

if (!jwt) {
  throw new Error(jwtMessages.jwtSecretError);
}

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async ({ userId }, done) => {
      try {
        const user = await User.findById(userId).select('email id');

        done(null, user ? user : false);
      } catch (e) {
        console.log(e);
      }
    }),
  );
};
