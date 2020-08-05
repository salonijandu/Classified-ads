const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('UserSchema');
require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
      callbackURL: '/users/auth/google/callback',
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const newuser = await User.findOne({
          googleId: profile.id
        });
        if (newuser) {
          return done(null, newuser);
        }
        const user = await new User({
          googleId: profile.id,
          googleName: profile.displayName
        }).save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);