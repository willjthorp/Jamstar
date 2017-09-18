const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username:     String,
  email:    String,
  password: String,
  city: String,
  facebookID: String,
  googleID: String,
  instruments: {
    type: Array,
    items: String
  },
  pic_path: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
