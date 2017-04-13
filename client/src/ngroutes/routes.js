'use strict';

angular.module('angApp').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'client/src/views/_index-view.html',
        controller: 'indexController'
    })
        .when('/error', {
            templateUrl: 'client/src/views/_error-view.html'
        })
        .otherwise({
            redirectTo: '/error'
        });

    $locationProvider.html5Mode(true);
}]);