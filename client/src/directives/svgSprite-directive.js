'use strict';

angular.module('angApp').directive('svgSprite', [function () {
    return {
        restrict: 'E',
        scope: {
            spriteId: '@'
        },
        replace: true,
        template: '<svg><use xlink:href=""/> </svg>',
        link: function (scope, svg, attrs) {

            svg.attr('class', attrs.class);
            svg.children().attr('xlink:href', 'public/svg-sprites.svg#' + attrs.spriteId);
        }
    };
}]);