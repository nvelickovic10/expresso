'use strict';

var request = require('request');
var _ = require('underscore');
var q = require('q');

var fetch = require('../utils/fetch.js');
var utils = require('../utils/utils.js');

var foursquareService = {};

/**
 * Fetches data from foursquare API at given url with given parameters.
 * @param {String} parameters
 */
foursquareService.getCoffeeShopsData = function (parameters) {
  var deferred = q.defer();
  var url = 'venues/explore';

  var foursquareSearchParameters = {
    ll: parameters.ll,
    llAcc: parameters.accuracy,
    radius: parameters.radius,
    limit: parameters.limit,
    offset: parameters.offset,
    sortByDistance: 'true',
    section: 'coffee',
    venuePhotos: 'true',
    openNow: 'true',
    price: '1,2,3,4'
  };
  fetch.fetchFoursquareDataAsJSON(url, foursquareSearchParameters, function (jsonData) {
    var returnData;
    if (parameters.raw) {
      returnData = jsonData;
    } else {
      returnData = utils.parseGroups(jsonData.response.groups);
    }

    if (parameters.sortByPrice) {
      returnData = _.sortBy(returnData, function (datum) {
        return -datum.price.tier;
      });
    }

    deferred.resolve({ status: 200, data: returnData });
  }, function (error) {
    deferred.reject({ error: error, response: 'failed connecting to foursquare API' });
  });
  return deferred.promise;
};

module.exports = foursquareService;