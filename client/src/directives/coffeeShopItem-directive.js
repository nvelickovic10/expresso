'use strict';

angular.module('angApp').directive('coffeeShopItem', [function () {
    return {
        restrict: 'E',
        scope: {
            coffeeShopData: '='
        },
        replace: false,
        templateUrl: 'client/src/views/subviews/_coffeeShopItem-view.html',
        link: function (scope, svg, attrs) {
            // console.log(scope.coffeeShopData);
        }
    };
}]);