'use strict';

angular.module('librecmsApp')
  .controller('CourseCtrl', function ($scope, UserService,
                                      CourseService, $stateParams) {
    // Listen to changes to the course object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.course = CourseService.getCourse();
      $scope.$apply();
    });

    // Gather course ID from the state (/course/{courseId}) 
    var courseId = $stateParams.courseId;
    CourseService.setCourseById(courseId);

    // Gather initial user from UserService
    $scope.user = UserService.user;

    $scope.$on('CourseService.updateCourse', function(e, course) {
      $scope.course = course;
    });
   

    // Listen for updateUser event and set scope accordingly
    $scope.$on('UserService.updateUser', function(e, user) {
      $scope.user = user;
    });
  });
