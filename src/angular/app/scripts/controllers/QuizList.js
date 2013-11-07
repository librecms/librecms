'use strict';

angular.module('librecmsApp')
  .controller('QuizListCtrl', function($scope) {
    console.log('hello from QuizListCtrl');

    // Listen to changes to the course notes object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.contentList =  $scope.course.quizzes;
    });
  });
