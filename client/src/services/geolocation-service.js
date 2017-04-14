'use strict';

angular.module('angApp').service('GeolocationService', function ($q) {
    var locationData = null;

    var _getLocationData = function () {
        var deffered = $q.defer();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                locationData = position;
                // console.log(position)
                deffered.resolve({
                    status: 200,
                    response: position
                });
            }, function (err) {
                deffered.reject({
                    status: 400,
                    msg: 'failed getting location data',
                    reason: 'user denied action'
                });
            });
        } else {
            deffered.reject({
                status: 400,
                msg: 'No geolocation support',
                reason: null
            });
        }
        return deffered.promise;
    };

    this.getLocationData = function () {
        var deffered = $q.defer();
        if (locationData === null) {
            _getLocationData().then(function (response) {
                deffered.resolve(response);
            }, function (error) {
                deffered.reject(error);
            });
        } else {
            deffered.resolve({
                status: 200,
                response: locationData
            });
        }
        return deffered.promise;
    };
});