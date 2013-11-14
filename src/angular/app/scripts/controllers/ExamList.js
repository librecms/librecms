'use strict';

angular.module('librecmsApp')
  .controller('ExamListCtrl', function($scope) {

    $scope.itemType = "exam";

    if ($scope.course && $scope.course.exams) {
      $scope.contentList = $scope.course.exams;
    }

    // Listen to changes to the course notes object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.contentList = $scope.course.exams;
    });
  });
