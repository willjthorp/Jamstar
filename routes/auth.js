const express    = require('express');
const passport   = require('passport');
const auth       = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


auth.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('auth/login', { message: req.flash('error'), req});
});

auth.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

auth.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('auth/signup', { message: req.flash('error'), req});
});

auth.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));


auth.get("/facebook", passport.authenticate("facebook"));
auth.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/private",
  failureRedirect: "/"
}));

module.exports = auth;
