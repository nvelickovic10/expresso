'use strict';

var express = require('express');

var foursquareController = require('./foursquareController');

var expressoController = express();

expressoController.get('/', function (req, res, next) {
  res.send('Expresso hello');
});

expressoController.use('/foursquare', foursquareController);

module.exports = expressoController;