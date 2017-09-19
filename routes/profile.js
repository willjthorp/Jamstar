const express = require('express');
const User = require("../models/user");
const Jam = require("../models/jam");
const profile = express.Router();
const multer         = require('multer');
const upload         = multer({ dest: './public/uploads/' });
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const instruments = require('../models/enums/instruments');

// Render profile home page
profile.get('/', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.user._id, (err, musician) => {
    if (err) {return next(err);}
    console.log(musician);
    res.render('profile/home', {req, musician});
  });
});

// Render edit profile page
profile.get('/:userId/edit', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id == userId) {
    res.render('profile/edit', {req, user: req.user, instruments});
  } else {
    res.redirect('/profile');
  }
});

// Save edited profile info
profile.post('/:userId/edit', ensureLoggedIn(), upload.single('profile-pic'), (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id == userId) {
    const updates = {
      city: req.body.city,
      email: req.body.email,
    };
    if (req.file) {
      updates.pic_path = `/uploads/${req.file.filename}`;
    }
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

// Render edit instruments page
profile.get('/:userId/instruments/edit', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id == userId) {
    res.render('profile/editinstruments', {req, user: req.user, instruments});
  } else {
    res.redirect('/profile');
  }
});

// Save edited intruments page
profile.post('/:userId/instruments/edit', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;

  var instrumentsUpdate = {
    instruments: req.body.instruments,
  };

  if (req.user._id == userId) {
    User.findByIdAndUpdate(userId, instrumentsUpdate, (err, user) => {
      if (err) { return next(err); }
      res.redirect('/profile');
    });
  } else {
    res.redirect('/profile');
  }
});


// View users jams
profile.get('/myjams', ensureLoggedIn(), (req, res, next) => {
  Jam.find({"creator" : req.user._id}, (err, jams) => {
     if (err) {
       return next(err);
     } else {
       console.log(jams);
       res.render('jams/viewown', {req, jams});
     }
   });
});


// Logout
profile.get('/logout', ensureLoggedIn(), (req, res, next) => {
  req.logout();
  res.redirect("/");
});

// Delete account
profile.get('/:userId/delete', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id == userId) {
    User.findByIdAndRemove(userId, (err, user) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  } else {
    res.redirect('/profile');
  }
});

module.exports = profile;
