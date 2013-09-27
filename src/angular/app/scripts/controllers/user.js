'use strict';

angular.module('librecmsApp')
  .controller('UserCtrl', function ($scope, Restangular) {
    $scope.users = Restangular.all('user').getList();
  });
