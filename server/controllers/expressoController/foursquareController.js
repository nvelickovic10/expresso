'use strict';

var express = require('express');
var request = require('request');
var _ = require('underscore');

var foursquareController = express();

var API_URL = 'https://api.foursquare.com/v2/';
var API_VERSION = '20170101';
var CLIENT_ID = '0VWAZA4ME5KLJOIGIR4K3II1G2BKZOPZI4PXAET30AWOYA04';
var CLIENT_SECRET = 'JXHE3RR1UG1XOBGY0H4IRUCIRU1WCNTXL5FAFQKTGK1P4VBK';


/**
 * Fetches data from foursquare API at given url with given parameters.
 * Secret and Id will be added to the request in this function.
 * @param {String} url
 * @param {Object} parameters
 * @param {function} callback
 */
var fetchFoursquareDataAsJSON = function (url, parameters, callback) {
  url = API_URL + url + '?v=' + API_VERSION + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET;
  if (parameters) {
    _.each(parameters, function (value, key) {
      url += '&' + key + '=' + value;
    });
  }
  request(url, function (error, response, body) {
    // console.log('error:', error);
    // console.log('statusCode:', response && response.statusCode);
    // console.log('body:', JSON.parse(body));
    if (callback) {
      callback(JSON.parse(body));
    }
  });
};

/**
 * Parses GET parameters.
 * Returns parsed parameters object.
 * @param {Object} rawParameters
 * @returns {Object}
 */
var parseGetParameters = function (rawParameters) {
  var parsedParameters = {};
  _.each(rawParameters, function (paramValue, paramName) {
    if (paramValue) {

      if (paramValue === 'true') {
        parsedParameters[paramName] = true;
      } else if (paramValue === 'false') {
        parsedParameters[paramName] = false;
      } else if (!isNaN(paramValue)) {
        parsedParameters[paramName] = parseFloat(paramValue);
      } else {
        parsedParameters[paramName] = paramValue;
      }

    }
  });
  return parsedParameters;
};

// /expresso/foursquare/nearCoffeeShops?ll=44.83,20.54&pretty=true
// coffee shop category 4bf58dd8d48988d1e0931735
foursquareController.get('/nearCoffeeShops', function (req, res) {
  var parameters = parseGetParameters(req.query);
  console.log(parameters);
  var url = 'venues/search';
  var foursquareSearchParameters = {
    ll: parameters.ll,
    query: parameters.query,
    radius: parameters.radius,
    categoryId: '4bf58dd8d48988d1e0931735'
  };
  fetchFoursquareDataAsJSON(url, foursquareSearchParameters, function (jsonData) {
    if (parameters.pretty) {
      res.send('<pre>' + JSON.stringify(jsonData, null, 2) + '</pre>');
    } else {
      res.json(jsonData);
    }
  });
});

foursquareController.get('/', function (req, res) {
  res.send('foursquareController');
});

module.exports = foursquareController;