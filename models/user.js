const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  username:     String,
  password: String,
  city: String,
  facebookID: String,
  googleID: String,
  instruments: {
    type: Array,
    items: String
  },
  genres: {
    type: Array,
    items: String
  },
  pic_path: {
    type: String,
    default: '/images/profile-default.jpg'
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
