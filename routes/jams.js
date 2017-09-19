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
    res.render('jams/new-location', {req, venues});
  });
});

// Save new jam
jams.post('/new', ensureLoggedIn(), (req, res, next) => {

  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  const newJam = new Jam({
    venueName: req.body.venueName,
    location: location,
    creator: req.user._id
  });

  newJam.save((err, jam) => {
    if (err) {
      res.render("jams/new", { req, message: "Something went wrong" });
    } else {
      res.redirect(`/jams/${jam.id}/edit`);
    }
  });
});

// View current users jams
// jams.get('/:userId/view', ensureLoggedIn(), (req, res, next) => {
//   const userId = req.params.userId;
//   User.findById(userId, (err, user) => {
//     if (err) {
//       return next(err);
//     }
//     Jam.find({"creator" : user._id}, (err, jams) => {
//        if (err) {
//          return next(err);
//        } else {
//          res.render('jams/viewown', {req, jams});
//        }
//      });
//    });
// });

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
    res.redirect(`/jams/${req.user._id}/view`);
  });
});


// View Specific Jam
jams.get('/:jamId/view', (req, res, next) => {
  const jamId = req.params.jamId;
  Jam.findById(jamId, (err, jam) => {
    console.log(jam);
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


// Delete a jam
jams.get('/:jamId/delete', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
  Jam.findById(jamId, (err, jam) => {
    if (err) {
      return next(err);
    }
    else if (JSON.stringify(jam.creator) === JSON.stringify(req.user._id)) {
      Jam.findByIdAndRemove(jamId, (err, jam) => {
        res.redirect(`/jams/${req.user._id}/view`);
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
