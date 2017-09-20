const express    = require('express');
const jams       = express.Router();
const Jam = require("../models/jam");
const User = require("../models/user");
const Venue = require("../models/venue");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// Render new jam form
jams.get('/new', ensureLoggedIn(), (req, res, next) => {
  Venue.find({}, (err, venues) => {
    if (err) {
      return next(err);
    }
    console.log(venues);
    res.render('jams/new-location', {req, venues});
  });
});

// Save new jam
jams.post('/new', ensureLoggedIn(), (req, res, next) => {

  const newJam = new Jam({
    venue: req.body.id,
    creator: req.user._id,
    attendees: [req.user._id]
  });

  console.log('New Jam:', newJam);
  newJam.save((err, jam) => {
    if (err) {
      console.log('ERRROR:', err);
      res.render("jams/new-location", { req, message: "Something went wrong" });
    } else {
      res.redirect(`/jams/${jam.id}/edit`);
    }
  });
});


// Render edit a jam form
jams.get('/:jamId/edit', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
  Jam.findById(jamId, (err, jam) => {
    if (err) {
      return next(err);
    }
    res.render('jams/edit', {req, jam});
  });
});

// Save edited jam info
jams.post('/:jamId/edit', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
  let updates = {
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    description: req.body.description
  };
  Jam.findByIdAndUpdate(jamId, updates, (err, jam) => {
    if (err) {
      return next(err);
    }
    res.redirect(`/jams/${jamId}/view`);
  });
});


// View Specific Jam
jams.get('/:jamId/view', (req, res, next) => {
  const jamId = req.params.jamId;
  Jam.findById(jamId).populate('invited').populate('attendees').populate('venue').exec(function (err, jam) {
    res.render('jams/viewsingle', {req, jam});
  });
});

// Invite users to jam page
jams.get('/:jamId/invite', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
  User.find({'_id': {$ne: req.user._id}}, (err, musicians) => {
    if (err) {
      return next(err);
    } else {
      Jam.findById(jamId, (err, jam) => {
        if (err) {
          return next(err);
        } else {
            res.render('musicians/viewall', {req, jam, musicians});
        }
      });
    }
  });
});

// Save invited users
jams.post('/:jamId/invite', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
  console.log(req.body);
  console.log(req.body);
  var jamUpdate = {
    invited: req.body.invited,
  };

  Jam.findByIdAndUpdate(jamId, jamUpdate, (err, jam) => {
    if (err) {
      return next(err);
    } else {
        res.redirect(`/jams/${jam.id}/view`);
    }
  });
});


// Delete a jam
jams.get('/:jamId/delete', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
  Jam.findById(jamId, (err, jam) => {
    if (err) {
      return next(err);
    }
    else if (JSON.stringify(jam.creator) === JSON.stringify(req.user._id)) {
      Jam.findByIdAndRemove(jamId, (err, jam) => {
        res.redirect(`/profile/myjams`);
      });
    } else {
      res.redirect(`/profile`);
    }
  });
});


// View all jams
jams.get('/view', (req, res, next) => {
  Jam.find({}).populate('creator', 'username').exec((err, jams) => {   // How does populate work???
    if (err) {
      return next(err);
    }
    res.render('jams/viewall', {req, jams});
  });
});

module.exports = jams;
