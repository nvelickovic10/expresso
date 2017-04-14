'use strict';

var request = require('request');
var _ = require('underscore');

var fetch = {};

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
fetch.fetchFoursquareDataAsJSON = function (url, parameters, callback, errcb) {
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
    if (response.statusCode === 200) {
      if (callback) {
        callback(JSON.parse(body));
      }
    } else {
      if (errcb) {
        errcb({ error: error, response: response });
      }
    }
  });
};

module.exports = fetch;