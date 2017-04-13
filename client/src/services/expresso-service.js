'use strict';

angular.module('angApp').service('ExpressoService', function () {
    var defaultData = {
        number: '6'
    };

    this.getData = function () {
        return defaultData;
    };
});