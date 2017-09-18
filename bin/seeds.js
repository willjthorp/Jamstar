/*jshint esversion: 6 */
const mongoose = require('mongoose');
// const User = require('../models/user');
const Venue = require('../models/venue');

mongoose.connect("mongodb://localhost/second-project");

const venues = [
  {
    name: 'La Mona de Seda',
    location: { type: 'Point', coordinates: [41.371645, 2.132731] },
    website: 'www.la-monadeseda.blogspot.com',
  },
  {
    name: 'La Salamandra',
    location: { type: 'Point', coordinates: [41.373080, 2.135447] },
    website: 'www.lasalamandra.net',
  },
  {
    name: 'La Plataforma',
    location: { type: 'Point', coordinates: [41.398125, 2.195737] },
    website: 'www.laplataformabcn.com',
  },
  {
    name: 'Shoot 115',
    location: { type: 'Point', coordinates: [41.391949, 2.167765] },
    website: 'shoot115.com',
  },
  {
    name: 'Nowhere Music',
    location: { type: 'Point', coordinates: [41.377010, 2.127379] },
    website: 'www.nowheremusic.com',
  },
];


Venue.create(venues, (err, docs)=>{
  if (err) { throw (err); }
    docs.forEach( (venue) => {
      console.log(venue);
    });
    mongoose.connection.close();
});
