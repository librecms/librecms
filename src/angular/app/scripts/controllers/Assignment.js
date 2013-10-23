'use strict';

angular.module('librecmsApp')
  .controller('AssignmentCtrl', function ($scope, $stateParams) {
    $scope.assignmentId = $stateParams.assignmentId;
    $scope.assignment = {
    };
  });
