const express = require('express');
const router = express.Router();
const Jam = require('../models/jam');
const Venue = require('../models/venue');

router.route('/jams')
	.get((req, res) => {
	  Jam.find({}).populate('venue').exec(function(error, jams) {
	  	if (error) {
	  		res.status(500).json({message: error});
	  	} else {
	  		res.status(200).json(jams);
	  	}
	  });
	});

router.route('/myjams')
	.get((req, res) => {
		Jam.find({"creator" : req.user._id}).populate('venue').exec(function(err, jams) {
			console.log(jams);
			if (err) {
				res.status(500).json({message: error});
			} else {
				res.status(200).json(jams);
			}
	});
});


router.route('/myinvited')
	.get((req, res) => {
		Jam.find({"invited" : req.user._id}).populate('venue').exec(function(err, jams) {
			if (err) {
				res.status(500).json({message: error});
			} else {
				res.status(200).json(jams);
			}
	});
});

router.route('/myattending')
	.get((req, res) => {
		Jam.find({"attendees" : req.user._id}).populate('venue').exec(function(err, jams) {
			if (err) {
				res.status(500).json({message: error});
			} else {
				res.status(200).json(jams);
			}
	});
});


router.route('/venues')
	.get((req, res) => {
	  Venue.find((error, venues) => {
	  	if (error) {
	  		res.status(500).json({message: error});
	  	} else {
	  		res.status(200).json(venues);
	  	}
  });
});


module.exports = router;
