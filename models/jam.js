const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const JamSchema = Schema({
  name: String,
  location: { type: { type: String }, coordinates: [Number] },
  date: String,
  time: String,
  pic_path: {type: String, default: '/images/jam-default.jpg'},
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  // attendees: [Object.types.user_id]
});

JamSchema.index({ location: '2dsphere' });

const Jam = mongoose.model('Jam', JamSchema);

module.exports = Jam;
