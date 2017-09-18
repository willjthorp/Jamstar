const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const VenueSchema = Schema({
  name: String,
  location: { type: { type: String }, coordinates: [Number] },
  website: String,
  pic_path: {type: String, default: '/images/venue-default.jpg'},
});

VenueSchema.index({ location: '2dsphere' });

const Venue = mongoose.model('Venue', VenueSchema);

module.exports = Venue;
