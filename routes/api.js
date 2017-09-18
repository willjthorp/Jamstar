const express = require('express');
const router = express.Router();
const Jam = require('../models/jam');
const Venue = require('../models/venue');

router.route('/jams')
	.get((req, res) => {
	  Jam.find((error, jams) => {
	  	if (error) {
	  		res.status(500).json({message: error});
	  	} else {
	  		res.status(200).json(jams);
	  	}
	  });
	});


router.route('/jams/:userId/view')
	.get((req, res) => {
		Jam.findById(req.params.jam_id, (error, jams) => {
			if (error) {
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
