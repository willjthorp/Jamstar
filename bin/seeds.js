/*jshint esversion: 6 */
const mongoose = require('mongoose');
// const User = require('../models/user');
const Venue = require('../models/venue');
const User = require('../models/user');

mongoose.connect("mongodb://localhost/second-project");
//
// const venues = [
//   {
//     name: 'World Sound Studios',
//     address: 'Carrer Muntaner, 400, 08006 Barcelona, Spain',
//     location: { type: 'Point', coordinates: [41.400074, 2.141777] },
//     website: 'worldsoundstudios.es',
//     pic_path: '/images/venuepics/room_recording_studio_sala_estudio_grabacion.jpg'
//   },
//   {
//     name: 'La Salamandra',
//     address: 'Carrer de Burgos, 55, 08014 Barcelona, Spain',
//     location: { type: 'Point', coordinates: [41.373080, 2.135447] },
//     website: 'www.lasalamandra.net',
//     pic_path: '/images/venuepics/Sala-Salamandra-Barcelona.jpg'
//   },
//   {
//     name: 'La Plataforma',
//     address: 'Carrer de Pujades, 99, 08005 Barcelona, Spain',
//     location: { type: 'Point', coordinates: [41.398125, 2.195737] },
//     website: 'www.laplataformabcn.com',
//     pic_path: '/images/venuepics/platforma.jpg'
//   },
//   {
//     name: 'Shoot 115',
//     address: 'Carrer de Pau Claris, 115, 08009 Barcelona, Spain',
//     location: { type: 'Point', coordinates: [41.391949, 2.167765] },
//     website: 'shoot115.com',
//     pic_path: '/images/venuepics/loft-brooklyn-shoot-estudios-barcelona.jpg'
//   },
//   {
//     name: 'Nowhere Music',
//     address: 'Carrer de Roger, 257, 08028 Barcelona, Spain',
//     location: { type: 'Point', coordinates: [41.377010, 2.127379] },
//     website: 'www.nowheremusic.com',
//     pic_path: '/images/venuepics/Control_7_IMG_7264_id44.jpg'
//   },
//   {
//     name: 'Casa Argelich',
//     address: 'Rambla de Catalunya, 34, 08007 Barcelona, Spain',
//     location: { type: 'Point', coordinates: [41.389806, 2.165482] },
//     website: 'http://casa-argelich.placestars.com/',
//     pic_path: '/images/venuepics/l.jpg'
//   },
//   {
//     name: 'El Tostadero',
//     address: 'Carrer Carolines, 13, 08012 Barcelona, Spain',
//     location: { type: 'Point', coordinates: [41.403495, 2.151063] },
//     website: 'tostadero.es',
//     pic_path: '/images/venuepics/l (1).jpg'
//   },
//   {
//     name: 'Growin’ Up',
//     address: 'Carrer Paus, 83, 08021 Barcelona, Spain',
//     location: { type: 'Point', coordinates: [41.551140, 2.112271] },
//     website: 'www.growinupstudios.com',
//     pic_path: '/images/venuepics/EOMXC0_7_400x400.jpeg'
//   },
//   {
//     name: 'Hangar',
//     address: 'Emilia Coranty, 16, 08018 Barcelona',
//     location: { type: 'Point', coordinates: [41.408484, 2.199717] },
//     website: 'https://www.hangar.org/',
//     pic_path: '/images/venuepics/emilia_coranty.jpg'
//   },
//   {
//     name: 'Espai Local',
//     address: 'Carrer Josep Soldevila, 60, 08030 Barcelona',
//     location: { type: 'Point', coordinates: [41.434387, 2.195514] },
//     website: 'www.espailocal.cat',
//     pic_path: '/images/venuepics/servicios.png'
//   },
// ];

const users = [
  {
    username: 'Dominic Lawrence',
    city: 'Barcelona',
    instruments: ['Piano', 'Clarinet', 'Trombone'],
    pic_path: '/images/userimgs/pexels-photo-91227.jpeg'
  },
  {
    username: 'Antonio Chandler',
    city: 'Barcelona',
    instruments: ['Bass Guitar', 'Oboe'],
    pic_path: '/images/userimgs/pexels-photo-175701.jpeg'
  },
  {
    username: 'Roderick	Harmon',
    city: 'Barcelona',
    instruments: ['Bass Guitar', 'Clarinet', 'Flute'],
    pic_path: '/images/userimgs/pexels-photo-193355.jpeg'
  },
  {
    username: 'Katrina Ramsey',
    city: 'Barcelona',
    instruments: ['Piano', 'Violin'],
    pic_path: '/images/userimgs/pexels-photo-171296.jpeg'
  },
  {
    username: 'Shelley Bass',
    city: 'Barcelona',
    instruments: ['Electric Guitar'],
    pic_path: '/images/userimgs/pexels-photo-206445.jpeg'
  },
  {
    username: 'Wm	Morales',
    city: 'Barcelona',
    instruments: ['Piano', 'Violin'],
    pic_path: '/images/userimgs/pexels-photo-211050.jpeg'
  },
  {
    username: 'Mable Schultz',
    city: 'Barcelona',
    instruments: ['Electric Guitar'],
    pic_path: '/images/userimgs/pexels-photo-206542.jpeg'
  },
  {
    username: 'Dewey Price',
    city: 'Barcelona',
    instruments: ['Electric Guitar', 'Violin', 'Trumpet'],
    pic_path: '/images/userimgs/pexels-photo-247917.jpeg'
  },
  {
    username: 'Katie Pena',
    city: 'Barcelona',
    instruments: ['Piano', 'Flute'],
    pic_path: '/images/userimgs/pexels-photo-253758.jpeg'
  },
  {
    username: 'Andrea	Lane',
    city: 'Barcelona',
    instruments: ['Vocals', 'Guitar'],
    pic_path: '/images/userimgs/pexels-photo-289825.jpeg'
  },
  {
    username: 'Roman Hill',
    city: 'Barcelona',
    instruments: ['Vocals'],
    pic_path: '/images/userimgs/pexels-photo.jpg'
  },
  {
    username: 'Nicholas	Daniels',
    city: 'Barcelona',
    instruments: ['Electric Guitar'],
    pic_path: '/images/userimgs/pexels-photo-428311.jpeg'
  },
  {
    username: 'Wilbert Bates',
    city: 'Barcelona',
    instruments: ['Vocals', 'Guitar'],
    pic_path: '/images/userimgs/pexels-photo-343717.jpeg'
  },
  {
    username: 'Kay Salazar',
    city: 'Barcelona',
    instruments: ['Drums'],
    pic_path: '/images/userimgs/pexels-photo-295564.jpeg'
  },
  {
    username: 'Kelli Curry',
    city: 'Barcelona',
    instruments: ['Drums'],
    pic_path: '/images/userimgs/pexels-photo-324030.jpeg'
  },
  {
    username: 'Kristi	Clayton',
    city: 'Barcelona',
    instruments: ['Drums', 'Tuba'],
    pic_path: '/images/userimgs/pexels-photo-324658.jpeg'
  },
  {
    username: 'Carole	Collins',
    city: 'Barcelona',
    instruments: ['Saxophone', 'Guitar', 'Tuba'],
    pic_path: '/images/userimgs/pexels-photo-354951.jpeg'
  },
  {
    username: 'Stewart Blake',
    city: 'Barcelona',
    instruments: ['Drums', 'Keyboard', 'Oboe'],
    pic_path: '/images/userimgs/pexels-photo-374871.jpeg'
  },
  {
    username: 'Sheldon Tyler',
    city: 'Barcelona',
    instruments: ['Saxophone', 'Keyboard'],
    pic_path: '/images/userimgs/pexels-photo-375880.jpeg'
  },
  {
    username: 'Tyler Bowen',
    city: 'Barcelona',
    instruments: ['Saxophone', 'Trumpet'],
    pic_path: '/images/userimgs/startup-photo.jpg'
  },
];


User.create(users, (err)=>{
  if (err) { throw (err); }
    mongoose.connection.close();
});
