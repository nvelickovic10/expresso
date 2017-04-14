'use strict';

angular.module('angApp').service('GeolocationService', function ($q) {
    var locationData = null;

    var _getLocationData = function () {
        var deffered = $q.defer();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                locationData = position;
                console.log(position)
                deffered.resolve({
                    status: 200,
                    response: position
                });
            });
        } else {
            deffered.reject({
                status: 400,
                response: 'No geolocation support'
            });
            console.log('No geolocation!');
        }
        return deffered.promise;
    };

    this.getLocationData = function () {
        var deffered = $q.defer();
        if (locationData === null) {
            _getLocationData().then(function (response) {
                deffered.resolve(response);
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