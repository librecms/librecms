'use strict';

angular.module('librecmsApp')
  .controller('QuizListCtrl', function($state,$scope,CourseService,$stateParams) {
    console.log('hello from QuizListCtrl');

    // Listen to changes to the course notes object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.quizzes =  $scope.course.quizzes;
    });
 });
