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

/**
 * Parses coffee shop data from raw venue data.
 * Returns parsed coffee shop object.
 * @param {Object} rawVenue
 * @returns {Object}
 */
var parseCoffeeShop = function (rawVenue, groupName) {
  // console.log(rawVenue);

  var parsedCoffeeShop = {};

  parsedCoffeeShop.id = rawVenue.id;
  parsedCoffeeShop.name = rawVenue.name;
  parsedCoffeeShop.distance = rawVenue.location.distance;

  if (rawVenue.price) {
    parsedCoffeeShop.price = rawVenue.price;
  }

  parsedCoffeeShop.categories = _.map(rawVenue.categories, function (category) {
    return {
      id: category.id,
      name: category.name
    };
  });

  if (rawVenue.featuredPhotos && rawVenue.featuredPhotos.count > 0) {
    parsedCoffeeShop.photo = rawVenue.featuredPhotos.items[0].prefix + 'original' + rawVenue.featuredPhotos.items[0].suffix;
  }

  parsedCoffeeShop.groupName = groupName;

  return parsedCoffeeShop;
};

/**
 * Parses coffee shop data from raw groups data.
 * Returns parsed coffee shops list.
 * @param {List} rawGroups
 * @returns {List}
 */
var parseGroups = function (rawGroups) {
  var parsedCoffeeShops = [];
  _.each(rawGroups, function (rawGroup, groupIndex) {
    _.each(rawGroup.items, function (item, itemIndex) {
      var parsedCoffeeShop = parseCoffeeShop(item.venue, rawGroup.name);
      parsedCoffeeShops.push(parsedCoffeeShop);
    });
  });
  return parsedCoffeeShops;
};

foursquareController.get('/exploreCoffeeShops', function (req, res) {
  var url = 'venues/explore';
  var parameters = parseGetParameters(req.query);

  // console.log(parameters.sortByPrice)

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

  fetchFoursquareDataAsJSON(url, foursquareSearchParameters, function (jsonData) {
    var returnData;
    if (parameters.raw) {
      returnData = jsonData;
    } else {
      returnData = parseGroups(jsonData.response.groups);
    }

    if (parameters.sortByPrice) {
      returnData = _.sortBy(returnData, function (datum) {
        return -datum.price.tier;
      });
    }
    // console.log(JSON.stringify(returnData, null, 2), returnData.length);

    if (parameters.pretty) {
      res.send('<pre>' + JSON.stringify(returnData, null, 2) + '</pre>');
    } else {
      res.json(returnData);
    }
  });
});

foursquareController.get('/', function (req, res) {
  res.send('foursquareController hello');
});

module.exports = foursquareController;