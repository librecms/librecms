'use strict';

angular.module('librecmsApp')
  .controller('CourseCtrl', function ($scope, UserService,
                                      CourseService, $stateParams) {
    // Gather initial user from UserService
    $scope.user = UserService.user;

    $scope.$on('CourseService.updateCourse', function(e, course) {
      $scope.course = course;
    });
   

    console.log('Hello from CourseCtrl');

    // Listen for updateUser event and set scope accordingly
    $scope.$on('UserService.updateUser', function(e, user) {
      $scope.user = user;
    });

    var courseId = $stateParams.courseId;
    $scope.course = CourseService.getCourse(courseId);


    $scope.setNewUser = function() {
      var newUser = {
        firstName: 'Nick',
        lastName: 'Buhay',
        id: '123543',
        fullname: function() {
          return this.firstName + ' ' + this.lastName;
        },
        courses: [
          {
            name: 'CMPSC483w',
            id: '483'
          },
          {
            name: 'CMPEN362',
            id: '362'
          }
        ]
      };
      UserService.update(newUser);
    };
  });
