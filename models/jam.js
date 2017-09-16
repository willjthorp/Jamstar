const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const JamSchema = Schema({
  name: String,
  place: String,
  time: Date,
  creator: String,
  // attendees: [Object.types.user_id]
});

const Jam = mongoose.model('Jam', JamSchema);

module.exports = Jam;
