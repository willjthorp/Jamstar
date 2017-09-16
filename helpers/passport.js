const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FbStrategy = require('passport-facebook').Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

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
      console.log("wrongggggg");
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
  (req, username, password, next) => {
    // To avoid race conditions
    process.nextTick(() => {
        User.findOne({
            'username': username
        }, (err, user) => {
            if (err){ return next(err); }

            if (user) {
                return next(null, false, { message: "Username already taken" });
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
  clientID: "462425837472046",
  clientSecret: "3cac5f64d51bc39b331430158ff6da6f",
  callbackURL: "/login/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id,
      name: profile.displayName,
      role: 'STUDENT'
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));

module.exports = passport;
