const express    = require('express');
const passport   = require('passport');
const auth       = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// Render login page
auth.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('auth/login', { message: req.flash('error'), req});
});

// Check login info
auth.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

// Render sign-up page
auth.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('auth/signup', { message: req.flash('error'), req});
});

// Save new user info
auth.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : `/profile/instruments/`,
  failureRedirect : '/signup',
  failureFlash : true
}));

// Facebook signup
auth.get("/login/facebook", ensureLoggedOut(), passport.authenticate("facebook"));
auth.get("/login/facebook/callback", ensureLoggedOut(), passport.authenticate("facebook", {
  successRedirect: "/profile",
  failureRedirect: "/"
}));

// Google sign up
auth.get("/login/google", ensureLoggedOut(), passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

auth.get("/login/google/callback", ensureLoggedOut(), passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/profile"
}));

module.exports = auth;
