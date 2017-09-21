const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");



module.exports = (passport) => {

  //Passport De/Serializer & Strategy
  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ "_id": id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  passport.use('local-login', new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }
      return next(null, user);
    });
  }));

  passport.use('local-signup', new LocalStrategy(
    { passReqToCallback: true },
    (req, email, password, next) => {
      // To avoid race conditions
      process.nextTick(() => {
          User.findOne({
              'email': email
          }, (err, user) => {
              if (err){
                return next(err);
              } else if (user) {
                return next(null, false, { message: "Email already taken" });
              } else {
                  // Destructure the body
                  const {
                    username,
                    email,
                    password,
                  } = req.body;
                  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                  const newUser = new User({
                    username,
                    email,
                    password: hashPass,
                  });

                  newUser.save((err) => {
                      if (err){ next(null, false, { message: newUser.errors }); }
                      return next(null, newUser);
                  });
              }
          });
      });
  }));


  passport.use(new FbStrategy({
    clientID: "271368853375246",
    clientSecret: "0d30cbc5369dbe9b5395b28206d43211",
    callbackURL: "/login/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'photos', 'emails']
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }

      var emails = profile.emails;
      var photos = profile.photos;

      const newUser = new User({
        facebookID: profile.id,
        username: profile.displayName,
        email: emails && emails[0].value,
        pic_path: photos && photos[0].value
      });

      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });

  }));

  passport.use(new GoogleStrategy({
    clientID: "1050090082346-botdg9nkbsioher4hkqaeagvh7pe6f4u.apps.googleusercontent.com",
    clientSecret: "AwxTSYVCRHpvI9xQcS3ux1X2",
    callbackURL: "/login/google/callback",
    profileFields: ['id', 'displayName', 'name', 'photos', 'emails']
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }

      const newUser = new User({
        googleID: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        pic_path: profile.photos[0].value
      });

      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });

  }));


};
