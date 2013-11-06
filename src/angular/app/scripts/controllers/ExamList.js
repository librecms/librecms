'use strict';

angular.module('librecmsApp')
  .controller('ExamListCtrl', function($state,$scope,CourseService,$stateParams) {
    console.log('hello from ExamListCtrl');

    // Listen to changes to the course notes object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.exams = $scope.course.exams;
    });
 });
