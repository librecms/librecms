'use strict';

angular.module('librecmsApp')
  .controller('NoteCtrl', function ($scope, UserService, CourseService, $stateParams) {
    // Gather initial user from UserService
    $scope.user = UserService.user;

    var courseId = $stateParams.courseId;
    $scope.course = CourseService.getCourse(courseId);

    $scope.$on('CourseService.update', function(e, course) {
      $scope.course = course;
    });


    // Listen for update event and set scope accordingly
    $scope.$on('UserService.update', function(e, user) {
      $scope.user = user;
    });

    $scope.showSubmit = false;
  });
