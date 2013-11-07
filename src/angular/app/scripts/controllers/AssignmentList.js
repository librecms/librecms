'use strict';

angular.module('librecmsApp')
  .controller('AssignmentListCtrl', function($scope) {
    console.log('hello from AssignmentListCtrl');

    // Listen to changes to the course assignments object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.contentList = $scope.course.assignments;
    });
  });
