'use strict';

angular.module('angApp').service('ExpressoService', function ($http, $q) {
    var coffeeShops;

    var _httpRequest = function (url, method) {
        var deffered = $q.defer();
        if (!url) {
            deffered.reject({
                status: 400,
                response: 'url parameter is mandatory'
            });
        }

        $http({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            url: url
        }).then(function successCallback(response) {
            deffered.resolve({
                status: response.status,
                response: response.data
            });
        }, function errorCallback(response) {
            deffered.reject(response);
        });

        return deffered.promise;
    };

    this.getCoffeeShopsData = function () {
        var deffered = $q.defer();
        _httpRequest('http://localhost:5000/expresso/foursquare/exploreCoffeeShops?ll=44.8,20.5&accuracy=20&radius=1000&limit=200&offset=0').then(function (response) {
            deffered.resolve(response);
        });
        return deffered.promise;
    };
});