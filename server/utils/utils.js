'use strict';

var _ = require('underscore');

var utils = {};

/**
 * Parses GET parameters.
 * Returns parsed parameters object.
 * @param {Object} rawParameters
 * @returns {Object}
 */
utils.parseGetParameters = function (rawParameters) {
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
utils.parseGroups = function (rawGroups) {
  var parsedCoffeeShops = [];
  _.each(rawGroups, function (rawGroup, groupIndex) {
    _.each(rawGroup.items, function (item, itemIndex) {
      var parsedCoffeeShop = parseCoffeeShop(item.venue, rawGroup.name);
      parsedCoffeeShops.push(parsedCoffeeShop);
    });
  });
  return parsedCoffeeShops;
};

module.exports = utils;