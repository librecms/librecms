'use strict';

angular.module('librecmsApp')
  .controller('AssignmentListCtrl', function($state,$scope,CourseService, $stateParams) {
    console.log('hello from AssignmentListCtrl');

    // Listen to changes to the course assignments object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.assignments = $scope.course.assignments;
    });
  });
