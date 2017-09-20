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
      console.log(jam.creator);
      console.log(req.user._id);
      if (err) {
        return next(err);
      } else if (JSON.stringify(jam.creator) === JSON.stringify(req.user._id)) {
        res.render('jams/edit', {req, jam});
      } else {
        res.redirect(`/jams/${jamId}/view`);
      }
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
    } else {
      res.redirect(`/jams/${jamId}/view`);
    }
  });
});


// View Specific Jam
jams.get('/:jamId/view', (req, res, next) => {
  const jamId = req.params.jamId;
  Jam.findById(jamId, (err, jam) => {
    if (err) {
      return next(err);
    } else {
      let attending;
      if (req.user && jam.attendees.indexOf(req.user._id) === -1) {
        attending = false;
      } else {
        attending = true;
      }
      Jam.findById(jamId).populate('invited').populate('attendees').populate('venue').exec(function (err, jam) {
        if (err) {
          return next(err);
        } else {
          res.render('jams/viewsingle', {req, jam, attending});
        }
      });
    }
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
            res.render('musicians/invite', {req, jam, musicians});
        }
      });
    }
  });
});

// Save invited users
jams.post('/:jamId/invite', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
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


// Add user to attending
jams.post('/:jamId/adduser', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
  Jam.findById(jamId, (err, jam) => {
    if (jam.invited) {
      let index = jam.invited.indexOf(req.user._id);
      if (index > -1) {
        jam.invited.splice(index, 1);
      }
    }
    jam.attendees.push(req.user._id);
    var jamUpdate = {
      attendees: jam.attendees,
      invited: jams.invited
    };
    Jam.findByIdAndUpdate(jamId, jamUpdate, (err, jam) => {
      if (err) {
        return next(err);
      } else {
          res.redirect(`/jams/${jam.id}/view`);
      }
    });
  });
});

// Remove from attending
jams.post('/:jamId/removeuser', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
  Jam.findById(jamId, (err, jam) => {
    let index = jam.attendees.indexOf(req.user._id);
    if (index > -1) {
      jam.attendees.splice(index, 1);
    }
    var jamUpdate = {
      attendees: jam.attendees,
    };
    Jam.findByIdAndUpdate(jamId, jamUpdate, (err, jam) => {
      if (err) {
        return next(err);
      } else {
          res.redirect(`/jams/${jam.id}/view`);
      }
    });
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
  Jam.find({}).populate('venue').exec(function(err, jams) {
    if (err) {
      return next(err);
    } else {
      let title = "Search All Jams";
      res.render('jams/list', {req, jams, title});
    }
  });
});

module.exports = jams;
