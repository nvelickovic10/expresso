'use strict';

angular.module('angApp').controller('indexController', function ($scope, ExpressoService, GeolocationService) {
    $scope.hello = 'Hello!';

    var getGeolocationData = function () {
        GeolocationService.getLocationData().then(function (data) {
            console.log('indexController getGeolocationData', data);
            getCoffeeShopsData();
        }, function (reason) {
            console.error(reason);
        });
    };

    var getCoffeeShopsData = function () {
        ExpressoService.getCoffeeShopsData().then(function (data) {
            console.log('indexController getCoffeeShopsData', data);
            $scope.hello = data.response;
        }, function (reason) {
            console.error(reason);
        });
    };

    getGeolocationData();
});