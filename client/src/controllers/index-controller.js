'use strict';

angular.module('angApp').controller('indexController', function ($scope, ExpressoService, GeolocationService) {

    $scope.blankCanvasColapsed = true;
    $scope.sortByPrice = false;
    $scope.error = null;
    $scope.loading = true;

    $scope.sort = function (value) {
        $scope.sortByPrice = value;
        _getData();
    };

    var _getCoffeeShopsData = function (cb) {
        ExpressoService.getCoffeeShopsData($scope.sortByPrice).then(cb, function (reason) {
            console.error(reason);
            $scope.error = JSON.stringify(reason, null, 2);
            $scope.blankCanvasColapsed = false;
            $scope.loading = false;
        });
    };

    var _getData = function () {
        $scope.loading = true;
        _getCoffeeShopsData(function (data) {
            // console.log('indexController init coffeeShopsData', data);
            $scope.coffeeShopsList = data.response;
            $scope.blankCanvasColapsed = false;
            $scope.loading = false;
        });
    };

    _getData();
});