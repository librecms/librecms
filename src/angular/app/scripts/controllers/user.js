'use strict';

angular.module('librecmsApp')
  .controller('UserCtrl', function ($scope, Restangular, $http) {

    // @TODO zdwolfe: 
    // I couldn't figure out how to force 
    // karma to flush scope and resolve the Restangular
    // promise. I opened an issue with Restangular here:
    // https://github.com/mgonto/restangular/issues/324

    //$scope.users = Restangular.all('user').getList();
    $http.get('/api/user').success(function(data) {
      $scope.users = data;
    });
  });
