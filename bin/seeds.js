
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const Schema   = mongoose.Schema;
const Venue = require('../models/venue');
const User = require('../models/user');
const Jam = require('../models/jam');

const jams = [
  {
    name: 'Time for a jam',
    venue: "59c4c98c693d9e00121e2736",
    date: "28th September, 2017",
    time: "17:00",
    genre: 'Indie',
    pic_path: '/images/jamimgs/Untitled-1.jpg',
    creator: '59c4c98b693d9e00121e2728',
    attendees: ['59c4c98b693d9e00121e2728', '59c4c98b693d9e00121e272b', '59c4c98b693d9e00121e2733', '59c4c98b693d9e00121e2730'],
  },

  {
    name: 'Lets rock!',
    venue: "59c4c98c693d9e00121e2735",
    date: "23th September, 2017",
    time: "19:15",
    genre: 'Rock',
    pic_path: '/images/jamimgs/Rock-music.jpg',
    creator: '59c4c98b693d9e00121e272b',
    attendees: ['59c4c98b693d9e00121e272b'],
  },

  {
    name: 'Country jam meet-up',
    venue: "59c4c98c693d9e00121e2734",
    date: "25th September, 2017",
    time: "12:00",
    genre: 'Country',
    pic_path: '/images/jamimgs/folk-band.jpg',
    creator: '59c4c98b693d9e00121e2733',
    attendees: ['59c4c98b693d9e00121e2733', '59c4c98b693d9e00121e2730'],
  },

  {
    name: 'Electronic Sesh',
    venue: "59c4c98c693d9e00121e2738",
    date: "26th September, 2017",
    time: "21:30",
    description: 'Get together to make some sweet electronic beats. Anyone welcome!',
    genre: 'Electronic',
    pic_path: '/images/jamimgs/download.jpg',
    creator: '59c4c98b693d9e00121e2730',
    attendees: ['59c4c98b693d9e00121e2730', '59c4c98b693d9e00121e272c', '59c4c98b693d9e00121e272f'],
    invited: ['59c4c98b693d9e00121e2733', '59c4c98b693d9e00121e2720', '59c4c98b693d9e00121e2723', '59c4c98b693d9e00121e2727']
  },

  {
    name: 'Jazz Music meetup',
    venue: "59c4c98c693d9e00121e273d",
    date: "28th September, 2017",
    time: "17:00",
    genre: 'Jazz',
    pic_path: '/images/jam-default.jpg',
    creator: '59c4c98b693d9e00121e2731',
    attendees: ['59c4c98b693d9e00121e2731', '59c4c98b693d9e00121e272c', '59c4c98b693d9e00121e2733', '59c4c98b693d9e00121e2727', '59c4c98b693d9e00121e2730'],
  },

  {
    name: 'Who wants to play some Classical music?',
    venue: "59c4c98c693d9e00121e2739",
    date: "30th September, 2017",
    time: "10:00",
    genre: 'Classical',
    pic_path: '/images/jamimgs/classical-music.jpeg',
    creator: '59c4c98b693d9e00121e2721',
    attendees: ['59c4c98b693d9e00121e2721', '59c4c98b693d9e00121e272e'],
  },

  {
    name: 'Reggae rhythms',
    venue: "59c4c98c693d9e00121e273a",
    date: "2nd October, 2017",
    time: "15:30",
    genre: 'Reggae',
    pic_path: '/images/jamimgs/Untitled-1.jpg',
    creator: '59c4c98b693d9e00121e272e',
    attendees: ['59c4c98b693d9e00121e272e', '59c4c98b693d9e00121e2731', '59c4c98b693d9e00121e272c'],
  },

];

Jam.create(jams, (err)=>{
  if (err) { throw (err); }
  mongoose.connection.close();
});
