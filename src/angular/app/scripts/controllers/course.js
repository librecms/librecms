'use strict';

angular.module('librecmsApp')
  .controller('CourseCtrl', function ($scope, UserService,
                                      CourseService, $stateParams) {
    // Listen to changes to the course object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.course = CourseService.getCourse();
      $scope.courseSelected = true;
    });

    // Gather course ID from the state (/course/{courseId}) 
    CourseService.setCourseById($stateParams.courseId);

    // Gather initial user from UserService
    $scope.user = UserService.user;
    // Listen for updateUser event and set scope accordingly
    $scope.$on('UserService.updateUser', function() {
      $scope.user = UserService.getUser();
    });
  });
