'use strict';

angular.module('angApp').controller('indexController', function ($scope, ExpressoService) {
    $scope.hello = 'Hello!' + ExpressoService.getData().number;
});