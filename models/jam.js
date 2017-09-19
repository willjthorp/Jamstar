const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const JamSchema = Schema({
  name: String,
  venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
  date: String,
  time: String,
  description: String,
  pic_path: {type: String, default: '/images/jam-default.jpg'},
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  invited: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

JamSchema.index({ location: '2dsphere' });

const Jam = mongoose.model('Jam', JamSchema);

module.exports = Jam;
