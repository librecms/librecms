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
    $scope.roster = [
      {
        name: "Nick",
        id: "123"
      },
      {
        name: "Marius",
        id: "945"
      },
      {
        name: "Zach",
        id: "425"
      },
      {
        name: "Jessie",
        id: "657"
      },
      {
        name: "Mike",
        id: "838"
      },
      {
        name: "Shawn",
        id: "454"
      },
      {
        name: "Tiffany",
        id: "324"
      }
    ];
    $scope.showSubmit = true;
    $scope.hideCollabs = true;
    $scope.toggleCollabs = function() {
      $scope.hideCollabs = $scope.hideCollabs === false ? true : false;
    }
  });
