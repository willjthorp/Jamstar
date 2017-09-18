/*jshint esversion: 6 */
const mongoose = require('mongoose');
// const User = require('../models/user');
const Venue = require('../models/venue');

mongoose.connect("mongodb://localhost/second-project");

const venues = [
  {
    name: 'La Mona de Seda',
    address: 'Carrer de Bonaventura Pollès, 25, 08014 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.371645, 2.132731] },
    website: 'www.la-monadeseda.blogspot.com',
  },
  {
    name: 'La Salamandra',
    address: 'Carrer de Burgos, 55, 08014 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.373080, 2.135447] },
    website: 'www.lasalamandra.net',
  },
  {
    name: 'La Plataforma',
    address: 'Carrer de Pujades, 99, 08005 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.398125, 2.195737] },
    website: 'www.laplataformabcn.com',
  },
  {
    name: 'Shoot 115',
    address: 'Carrer de Pau Claris, 115, 08009 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.391949, 2.167765] },
    website: 'shoot115.com',
  },
  {
    name: 'Nowhere Music',
    address: 'Carrer de Roger, 257, 08028 Barcelona, Spain',
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
