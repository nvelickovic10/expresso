'use strict';

angular.module('angApp').directive('error', [function () {
    return {
        restrict: 'E',
        scope: {
            msg: '='
        },
        replace: true,
        templateUrl: 'client/src/views/_error-view.html',
        link: function (scope, svg, attrs) {
        }
    };
}]);