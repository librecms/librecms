'use strict';

angular.module('librecmsApp')
  .controller('AssignmentCtrl', function ($scope, $stateParams) {
    $scope.assignmentId = $stateParams.assignmentId;
    $scope.assignment = {
      name: 'Homework 5',
      description: 'Do questions 1, 2, 3 and 4 from chapter 5',
      attachments: [
        {
          title: 'SOMEPDF.pdf'
        }
      ]
    };
    $scope.showSubmit = true;
  });
