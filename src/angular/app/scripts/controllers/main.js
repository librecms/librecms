'use strict';

angular.module('librecmsApp')
  .controller('MainCtrl',
    function ($scope, UserService, CourseService,
              $stateParams, $state, $rootScope, AuthService, $log) {

    $scope.logout = AuthService.logout;
    $rootScope.$state = $state;
    // Gather initial user from UserService
    $scope.user = UserService.getUser();
    $scope.$on('UserService.update', function() {
      $scope.user = UserService.getUser();
    });

    // Listen to changes to the course object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.course = CourseService.getCourse();
      $scope.courseSelected = true;
    });
    
    // Gather course ID from the state (/course/{courseId}) 
    var courseId = $stateParams.courseId;
    CourseService.setCourseById(courseId);
    
    // NavBar Visibility: Hidden when course isn't selected
    $scope.resetNavBar = function() {
        $scope.courseSelected = false;
    };
    $scope.courseSelect = function() {
   	  $scope.courseSelected = true;
    }; 

  });
