'use strict';

angular.module('librecmsApp')
  .controller('QuizListCtrl', function($scope) {
    console.log('hello from QuizListCtrl');

    $scope.itemType = "quiz";

    if ($scope.course && $scope.course.quizzes) {
      $scope.contentList = $scope.course.quizzes;
    }

    // Listen to changes to the course notes object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.contentList =  $scope.course.quizzes;
    });
  });
