'use strict';

angular.module('librecmsApp')
  .controller('AuthWidgetCtrl', function ($scope, AuthService, $log, $timeout) {
    $log.info('hello from AuthWidgetCtrl');
    $scope.login = function() {
      $log.info('login');
      // @TODO AuthService.login should return a promise
      var authParams = {
        username: $scope.username,
        password: $scope.password
      };

      function authError() {
        $scope.loginFailed = true;
        $timeout(function() { $scope.loginFailed = false; }, 1000);
      }

      AuthService.login(authParams, authError);
    };
  });
