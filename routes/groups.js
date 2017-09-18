const express    = require('express');
const groups       = express.Router();
const Group = require("../models/group");
const User = require("../models/user");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// Render new group form page
groups.get('/new', ensureLoggedIn(), (req, res, next) => {
  res.render('groups/new', {req});
});

// Save new group
groups.post('/:userId/view', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;

  const newGroup = new Group({
    name: req.body.name,
    creator: req.user._id
  });

  newGroup.save((err) => {
    if (err) {
      res.render("groups/new", { req, message: "Something went wrong" });
    } else {
      res.redirect(`/groups/${userId}/view`);
    }
  });
});

// View groups
groups.get('/:userId/view', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId, (err, user) => {
    if (err) { return next(err); }
    Group.find({"creator" : user._id}, (err, groups) => {
       if (err) { return next(err); }
       else {
         res.render('groups/viewown', {req, groups});
       }
     });
   });
});

module.exports = groups;
