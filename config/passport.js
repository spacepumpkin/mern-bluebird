// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('./keys');

const options = {};
// where we're getting our jwt - from authheader
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    // payload includes what we specify in users.js
    // console.log(jwt_payload); // should return user info if we add correct token in Auth header
    User.findById(jwt_payload.id)
      .then( (user) => {
        if (user) {
          // return user to frontend
          return done(null, user);
        }
        // return false since there's no user
        return done(null, false);
      })
      .catch( err => console.log(err));
    // prevents passport from hanging
    // done();
  }))
}