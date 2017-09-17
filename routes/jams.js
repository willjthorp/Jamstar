const express    = require('express');
const jams       = express.Router();
const Jam = require("../models/jam");
const User = require("../models/user");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// Render new jam form
jams.get('/new', ensureLoggedIn(), (req, res, next) => {
  res.render('jams/new', {req});
});

// Save new jam
jams.post('/:userId/view', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;

  let location = {
		    type: 'Point',
		    coordinates: [req.body.longitude, req.body.latitude]
		  };

  const newJam = new Jam({
    name: req.body.name,
    location: location,
    time: req.body.time,
    creator: req.user._id
  });
  newJam.save((err) => {
    if (err) {
      res.render("jams/new", { req, message: "Something went wrong" });
    } else {
      res.redirect(`/jams/${userId}/view`);
    }
  });
});

// View current users jams
jams.get('/:userId/view', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId, (err, user) => {
    if (err) { return next(err); }
    Jam.find({"creator" : user._id}, (err, jams) => {
       if (err) { return next(err); }
       else {
         res.render('jams/viewown', {req, jams});
       }
     });
   });
});

// Render edit a jam form
jams.get('/:jamId/edit', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
  Jam.findById(jamId, (err, jam) => {
    if (err) {return next(err);}
    console.log(req);
    res.render('jams/edit', {req, jam});
  });
});

// Save edited jam info
jams.post('/:jamId/edit', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
  let updates = {
    name: req.body.name,
    place: req.body.place,
    time: req.body.time
  };
  Jam.findByIdAndUpdate(jamId, updates, (err, jam) => {
    if (err) {return next(err);}
    res.redirect(`/jams/${req.user._id}/view`);
  });
});

// Delete a jam
jams.get('/:jamId/delete', ensureLoggedIn(), (req, res, next) => {
  const jamId = req.params.jamId;
  Jam.findById(jamId, (err, jam) => {
    console.log(JSON.stringify(jam.creator));
    console.log(JSON.stringify(req.user._id));
    if (err) {return next(err);}
    else if (JSON.stringify(jam.creator) === JSON.stringify(req.user._id)) {
      console.log("working!");
      Jam.findByIdAndRemove(jamId, (err, jam) => {
        res.redirect(`/jams/${req.user._id}/view`);
      });
    } else {
      console.log("nahhhhhh");
      res.redirect(`/profile`);
    }
  });
});

// View all jams
jams.get('/view', (req, res, next) => {
  Jam.find({}).populate('creator', 'username').exec((err, jams) => {   // How does populate work???
    if (err) {return next(err);}
    res.render('jams/viewall', {req, jams});
  });
});

module.exports = jams;
