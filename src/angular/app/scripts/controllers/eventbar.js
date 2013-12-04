'use strict';

angular.module('librecmsApp')
.controller('EventbarCtrl', function($scope, UserService, Restangular) {

  $scope.events = [];
  $scope.months = [];

  function getUserAssignments() {
    var user = UserService.getUser();
    if(user) {
      Restangular.one('users', user._id).getList('courses').then(function(courses) {
        courses.forEach(function(course) {
          Restangular.one('courses', course._id).getList('assignments').then(function(assignments) {
            // Gather assignments from API and reformat their
            // start and end components into Javascript Date objects
            var now = new Date();

            assignments.forEach(function(assignment) {
              if(assignment.due >= now) {
                assignment.start = new Date(assignment.posted);
                assignment.end = new Date(assignment.due);
                assignment.month = assignment.end.getMonth();
                $scope.events.push(assignment);

                var monthExists = -1;
                $scope.months.forEach(function(month) {
                  if(month.month == assignment.end.getMonth()) {
                    monthExists = 0;
                  }
                });

                if(monthExists == -1) {
                  $scope.months.push({date:assignment.end, month:assignment.end.getMonth()});
                }
              }
            });
          });
        });
      });
    }
  }

  $scope.toggleEventStatus = function(param) {
    var Event = Restangular.one('users', $scope.user._id).one('events', param).get()
        .then(function(event) {
        console.log(JSON.stringify(event));
        if(event.completed == false) {
          console.log("YES");
        }
        });
  }

  if ($scope.user || $scope.user === undefined) {
    getUserAssignments();
  }

  $scope.$on('UserService.update', getUserAssignments);

  /* event sources array */
  $scope.test = [$scope.events];
  $scope.quantity = 5;

});
