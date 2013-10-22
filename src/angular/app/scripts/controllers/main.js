'use strict';

angular.module('librecmsApp')
  .controller('MainCtrl', function ($scope, UserService) {
    // Gather initial user from UserService
    $scope.user = UserService.user;

    // Listen for update event and set scope accordingly
    $scope.$on('UserService.update', function(e, user) {
      $scope.user = user;
    });
  });
