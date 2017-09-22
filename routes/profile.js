const express = require('express');
const User = require("../models/user");
const Jam = require("../models/jam");
const profile = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt     = 10;
const multer         = require('multer');
const upload         = multer({ dest: './public/uploads/' });
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const instruments = require('../models/enums/instruments');
const genres = require('../models/enums/genres');

// Render profile home page
profile.get('/', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.user._id, (err, musician) => {
    if (err) {
      return next(err);
    } else {
        res.render('profile/home', {req, musician});
    }
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
      if (err) {
        return next(err);
      } else {
        res.redirect('/profile');
      }
    });
  } else {
    res.redirect('/profile');
  }
});

profile.get('/instruments', ensureLoggedIn(), (req, res, next) => {
  res.redirect(`/profile/${req.user._id}/instruments/edit`, {req, user: req.user, instruments});
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
      if (err) {
        return next(err);
      } else {
          res.redirect('/profile');
      }
    });
  } else {
      res.redirect('/profile');
  }
});


// Render edit bio page
profile.get('/:userId/bio/edit', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id == userId) {
    res.render('profile/editbio', {req, user: req.user, genres});
  } else {
    res.redirect('/profile');
  }
});

// Save edited bio page
profile.post('/:userId/bio/edit', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;

  var bioUpdate = {
    genres: req.body.genres,
    influences: req.body.influences
  };

  if (req.user._id == userId) {
    User.findByIdAndUpdate(userId, bioUpdate, (err, user) => {
      if (err) {
        return next(err);
      } else {
          res.redirect('/profile');
      }
    });
  } else {
      res.redirect('/profile');
  }
});



// View users jams
profile.get('/myjams', ensureLoggedIn(), (req, res, next) => {
  Jam.find({"creator" : req.user._id}).populate('venue').exec(function(err, jams) {
    if (err) {
      return next(err);
    } else {
      let title = "My Jams";
      res.render('jams/list', {req, jams, title});
    }
  });
});


// View invited to jams
profile.get('/myinvites', ensureLoggedIn(), (req, res, next) => {
  Jam.find({'invited' : req.user._id}).populate('venue').exec(function(err, jams) {
    console.log(jams);
    if (err) {
      return next(err);
    } else {
      let title = "Jams I'm Invited To";
      res.render('jams/list', {req, jams, title});
    }
  });
});


// View attending jams
profile.get('/myattending', ensureLoggedIn(), (req, res, next) => {
  Jam.find({'attendees' : req.user._id}).populate('venue').exec(function(err, jams) {
    if (err) {
      return next(err);
    } else {
      let title = "Jams I'm Attending";
      res.render('jams/list', {req, jams, title});
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
      if (err) {
        return next(err);
      } else {
          res.redirect('/');
      }
    });
  } else {
      res.redirect('/profile');
  }
});

module.exports = profile;
