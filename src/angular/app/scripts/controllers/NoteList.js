'use strict';

angular.module('librecmsApp')
  .controller('NoteListCtrl', function($state,$scope,CourseService,$stateParams) {
    console.log('hello from NoteListCtrl');

    // Listen to changes to the course notes object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.notes =  $scope.course.notes;
    });
 });
