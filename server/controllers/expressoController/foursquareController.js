'use strict';

var express = require('express');

var foursquareController = express();

foursquareController.get('/json', function (req, res) {
  res.json({ status: 'success' });
});

foursquareController.get('/', function (req, res) {
  res.send('foursquareController');
});

module.exports = foursquareController;