'use strict';

angular.module('librecmsApp')
  .directive('auth', function (AuthService) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the auth directive');
      }
    };
  });
