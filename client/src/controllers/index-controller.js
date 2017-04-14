'use strict';

angular.module('angApp').controller('indexController', function ($scope, ExpressoService, GeolocationService) {

    $scope.blankCanvasColapsed = true;
    $scope.sortByPrice = false;
    $scope.error = null;

    $scope.sort = function () {
        $scope.sortByPrice = !$scope.sortByPrice;
        _getData();
    };

    var _getCoffeeShopsData = function (cb) {
        ExpressoService.getCoffeeShopsData($scope.sortByPrice).then(cb, function (reason) {
            console.error(reason);
            $scope.error = JSON.stringify(reason, null, 2);
            $scope.blankCanvasColapsed = false;
        });
    };

    var _getData = function () {
        _getCoffeeShopsData(function (data) {
            // console.log('indexController init coffeeShopsData', data);
            $scope.coffeeShopsList = data.response;
            $scope.blankCanvasColapsed = false;
        });
    };

    _getData();
});