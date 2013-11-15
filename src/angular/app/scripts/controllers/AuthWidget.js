'use strict';

angular.module('librecmsApp')
  .controller('AuthWidgetCtrl', function ($scope, AuthService, $log) {
    $log.info('hello from AuthWidgetCtrl');
    $scope.login = function() {
      $log.info('login');
      // @TODO AuthService.login should return a promise
      AuthService.login({
        username: $scope.username,
        password: $scope.password
      });
    };
  });
