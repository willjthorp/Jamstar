/*jshint esversion: 6 */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const Jam = require('../models/venue');

const Jams = [
  {
    name: 'Time for a jam',
    venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
    date: String,
    time: String,
    description: String,
    genre: String,
    pic_path: {type: String, default: '/images/jam-default.jpg'},
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    invited: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }
];

User.create(users, (err)=>{
  if (err) { throw (err); }
  mongoose.connection.close();
});
