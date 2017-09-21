const express    = require('express');
const musicians       = express.Router();
const Jam = require("../models/jam");
const User = require("../models/user");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// View all muscians
musicians.get('/view', (req, res, next) => {
  if (req.user) {
    User.find({'id': {$ne: req.user._id}}, (err, musicians) => {
      if (err) {
        return next(err);
      } else {
          res.render('musicians/viewall', { req, musicians });
      }
    });
  } else {
    User.find({}, (err, musicians) => {
      if (err) {
        return next(err);
      } else {
          res.render('musicians/viewall', { req, musicians });
      }
    });
  }
});

// View single musician
musicians.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId, (err, musician) => {
    if (err) {
      return next(err);
    } else if (req.user && JSON.stringify(req.user._id) === JSON.stringify(musician.id)) {
       res.redirect('/profile');
    } else {
       res.render('musicians/viewsingle', { req, musician });
    }
  });
});


module.exports = musicians;
