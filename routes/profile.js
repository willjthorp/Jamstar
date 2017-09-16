const express = require('express');
const User = require("../models/user");
const profile = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

profile.get('/', ensureLoggedIn(), (req, res, next) => {
  res.render('profile/home', {req});
});

profile.get('/:userId/edit', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id == userId) {
    res.render('profile/edit', {req, user: req.user});
  } else {
    res.redirect('/profile');
  }
});

profile.post('/:userId/edit', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id == userId) {
    const updates = {
      email: req.body.email,
    };
    if (req.body.password) {
      updates.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(bcryptSalt));
    }
    User.findByIdAndUpdate(userId, updates, (err, user) => {
      if (err) { return next(err); }
      else {
        res.redirect('/profile');
      }
    });
  } else {
    res.redirect('/profile');
  }
});

profile.get('/:userId/instruments/edit', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id == userId) {
    res.render('profile/editinstruments', {req, user: req.user});
  } else {
    res.redirect('/profile');
  }
});

profile.post('/:userId/instruments/edit', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id == userId) {
    User.findById(userId, (err, user) => {
      if (err) { return next(err); }
      else {
        var checkboxes = document.getElementsByClassName('checkbox');
        user.instruments = [];
        for (var i=0; i < checkboxes.length; i++) {
           if (checkboxes[i].checked) {
              user.instruments.push(checkboxes[i].val());
           }
        }
        res.redirect('/profile');
      }
    });
  } else {
    res.redirect('/profile');
  }
});


profile.get('/logout', ensureLoggedIn(), (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = profile;
