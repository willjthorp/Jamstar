const express = require('express');
const router = express.Router();
const Jam = require('../models/jam');

router.route('/')
	.get((req, res) => {
	  Jam.find((error, jams) => {
	  	if (error) {
	  		res.status(500).json({message: error});
	  	} else {
	  		res.status(200).json(jams);
	  	}
	  });
	});


router.route('/:jam_id')
	.get((req, res) => {
		Jam.findById(req.params.jam_id, (error, jam) => {
			if (error) {
				res.status(500).json({message: error});
			} else {
				res.status(200).json(jam);
			}
		});
	});


module.exports = router;
