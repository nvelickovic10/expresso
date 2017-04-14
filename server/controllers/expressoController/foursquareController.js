'use strict';

var express = require('express');
var request = require('request');
var _ = require('underscore');

var foursquareService = require('../../services/foursquare-service.js');
var utils = require('../../utils/utils.js');

var foursquareController = express();

foursquareController.get('/exploreCoffeeShops', function (req, res) {
  var parameters = utils.parseGetParameters(req.query);

  foursquareService.getCoffeeShopsData(parameters).then(function (resp) {
    if (resp.status === 200) {
      if (parameters.pretty) {
        res.send('<pre>' + JSON.stringify(resp.data, null, 2) + '</pre>');
      } else {
        res.json(resp.data);
      }
    } else {
      res.status(500).json(resp);
    }
  }, function (error) {
    res.status(500).json(error);
  });

});

foursquareController.get('/', function (req, res) {
  res.send('foursquareController hello');
});

module.exports = foursquareController;