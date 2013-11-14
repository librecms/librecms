'use strict';

angular.module('librecmsApp')
  .controller('MainCtrl', function ($scope, UserService, CourseService,
                                    $stateParams, $state, $rootScope) {
    $rootScope.$state = $state;
    // Gather initial user from UserService
    $scope.user = UserService.getUser();
    $scope.$on('UserService.update', function() {
      $scope.user = UserService.getUser();
    });

    // Listen to changes to the course object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.course = CourseService.getCourse();
    });

    // Gather course ID from the state (/course/{courseId}) 
    var courseId = $stateParams.courseId;
    CourseService.setCourseById(courseId);
  });
