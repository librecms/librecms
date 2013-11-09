'use strict';

angular.module('librecmsApp')
  .controller('NoteListCtrl', function($scope) {
    console.log('hello from NoteListCtrl');

    if ($scope.course && $scope.course.notes) {
      $scope.contentList = $scope.course.notes;
    }

    // Listen to changes to the course notes object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.notes =  $scope.course.notes;
    });
  });
