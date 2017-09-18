const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const GroupSchema = Schema({
  name: String,
  members: [String],
  genre: [String],
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
