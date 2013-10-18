'use strict';

angular.module('librecmsApp')
  .controller('MainCtrl', function ($scope, UserService) {
    // Gather initial user from UserService
    $scope.user = UserService.user;

    // Listen for updateUser event and set scope accordingly
    $scope.$on('UserService.updateUser', function(e, user) {
      $scope.user = user;
    });
  });
