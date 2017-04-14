'use strict';

angular.module('angApp').controller('indexController', function ($scope, ExpressoService) {
    $scope.hello = 'Hello!' + ExpressoService.getData().number;

    var getGeolocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position);
            });
        } else {
            console.log('No geolocation!');
        }
    };

    if (navigator) {
        getGeolocation();
    }
});