'use strict';

angular.module('angApp').controller('indexController', function ($scope, ExpressoService, GeolocationService) {
    $scope.hello = 'Hello!';

    $scope.blankCanvasColapsed = true;
    $scope.sortByPrice = false;

    $scope.click = function () {
        $scope.blankCanvasColapsed = !$scope.blankCanvasColapsed;
    };

    $scope.sort = function () {
        $scope.sortByPrice = !$scope.sortByPrice;
        _getData();
    };

    var _getCoffeeShopsData = function (cb) {
        ExpressoService.getCoffeeShopsData($scope.sortByPrice).then(cb, function (reason) {
            console.error(reason);
        });
    };

    // var _getGeolocationData = function (cb) {
    //     GeolocationService.getLocationData().then(cb, function (reason) {
    //         console.error(reason);
    //     });
    // };

    var _getData = function () {
        // _getGeolocationData(function (data) {
        //     console.log('indexController init geolocationData', data);
        _getCoffeeShopsData(function (data) {
            console.log('indexController init coffeeShopsData', data);
            $scope.coffeeShopsList = data.response;
            $scope.blankCanvasColapsed = false;
        });
        // });
    };

    _getData();
});