'use strict';

angular.module('librecmsApp')
  .controller('CourseCtrl', function ($scope, UserService) {
    // Gather initial user from UserService
    $scope.user = UserService.user;

    // Listen for updateUser event and set scope accordingly
    $scope.$on('UserService.updateUser', function(e, user) {
      $scope.user = user;
    });

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
      UserService.updateUser(newUser);
    };
  });
