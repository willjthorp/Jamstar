/*jshint esversion: 6 */
const mongoose = require('mongoose');
// const User = require('../models/user');
const Venue = require('../models/venue');

mongoose.connect("mongodb://localhost/second-project");

const venues = [
  {
    name: 'World Sound Studios',
    address: 'Carrer Muntaner, 400, 08006 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.400074, 2.141777] },
    website: 'worldsoundstudios.es',
    pic_path: '/images/venuepics/room_recording_studio_sala_estudio_grabacion.jpg'
  },
  {
    name: 'La Salamandra',
    address: 'Carrer de Burgos, 55, 08014 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.373080, 2.135447] },
    website: 'www.lasalamandra.net',
    pic_path: '/images/venuepics/Sala-Salamandra-Barcelona.jpg'
  },
  {
    name: 'La Plataforma',
    address: 'Carrer de Pujades, 99, 08005 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.398125, 2.195737] },
    website: 'www.laplataformabcn.com',
    pic_path: '/images/venuepics/platforma.jpg'
  },
  {
    name: 'Shoot 115',
    address: 'Carrer de Pau Claris, 115, 08009 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.391949, 2.167765] },
    website: 'shoot115.com',
    pic_path: '/images/venuepics/loft-brooklyn-shoot-estudios-barcelona.jpg'
  },
  {
    name: 'Nowhere Music',
    address: 'Carrer de Roger, 257, 08028 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.377010, 2.127379] },
    website: 'www.nowheremusic.com',
    pic_path: '/images/venuepics/Control_7_IMG_7264_id44.jpg'
  },
  {
    name: 'Casa Argelich',
    address: 'Rambla de Catalunya, 34, 08007 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.389806, 2.165482] },
    website: 'http://casa-argelich.placestars.com/',
    pic_path: '/images/venuepics/l.jpg'
  },
  {
    name: 'El Tostadero',
    address: 'Carrer Carolines, 13, 08012 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.403495, 2.151063] },
    website: 'tostadero.es',
    pic_path: '/images/venuepics/l (1).jpg'
  },
  {
    name: 'Growin’ Up',
    address: 'Carrer Paus, 83, 08021 Barcelona, Spain',
    location: { type: 'Point', coordinates: [41.551140, 2.112271] },
    website: 'www.growinupstudios.com',
    pic_path: '/images/venuepics/EOMXC0_7_400x400.jpeg'
  },
  {
    name: 'Hangar',
    address: 'Emilia Coranty, 16, 08018 Barcelona',
    location: { type: 'Point', coordinates: [41.408484, 2.199717] },
    website: 'https://www.hangar.org/',
    pic_path: '/images/venuepics/emilia_coranty.jpg'
  },
  {
    name: 'Espai Local',
    address: 'Carrer Josep Soldevila, 60, 08030 Barcelona',
    location: { type: 'Point', coordinates: [41.434387, 2.195514] },
    website: 'www.espailocal.cat',
    pic_path: '/images/venuepics/servicios.png'
  },
];


Venue.create(venues, (err)=>{
  if (err) { throw (err); }
    mongoose.connection.close();
});
