const express    = require('express');
const musicians       = express.Router();
const Jam = require("../models/jam");
const User = require("../models/user");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

musicians.get('/view', (req, res, next) => {
  User.find({}, (err, musicians) => {
    if (err) {return next(err);}
    res.render('musicians/viewall', { req, musicians });
  });
});

musicians.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId, (err, musician) => {
    if (err) {return next(err);}
    res.render('musicians/viewsingle', { req, musician });
  });
});

module.exports = musicians;
