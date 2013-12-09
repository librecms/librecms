'use strict';

angular.module('librecmsApp')
.controller('CourseEventbarCtrl', function($scope, UserService, CourseService, Restangular) {

  $scope.events = [];
  $scope.months = [];

  function getCourseAssignments() {
    var user = UserService.getUser();
    if (!$scope.course || !$scope.course._id ||
        !user || !user._id) {
      return;
    }

    var startOfThisMonth = new Date().getTime();
    Restangular.one('courses', $scope.course._id).getList('assignments').then(function(assignments) {

      // Clear events and months array 
      $scope.events.splice(0, $scope.events.length);
      $scope.months.splice(0, $scope.months.length);

      // Gather assignments from API and reformat their
      // start and end components into Javascript Date objects
      var now = new Date();

      assignments.forEach(function(assignment) {
        if(assignment.due >= now) {
          assignment.posted = new Date(assignment.posted);
          assignment.due = new Date(assignment.due);
          assignment.month = assignment.due.getMonth();
          assignment.yearMonth = {'year': assignment.due.getYear(), 'Month': assignment.month};
          $scope.events.push(assignment);

          var monthExists = -1;
          $scope.months.forEach(function(month) {
            if(month.month == assignment.due.getMonth()) {
              monthExists = 0;
            }
          });

          if(monthExists == -1) {
            $scope.months.push({date:assignment.due, month:assignment.due.getMonth()});
          }
        }
      });
    });
  }

  $scope.toggleEventStatus = function(param) {
    var Event = Restangular.one('users', $scope.user._id).one('events', param).post();
  }

  
  //getCourseAssignments();

  //$scope.$on('CourseService.courseUpdated', getCourseAssignments);

  $scope.$watch('course', function() {
    getCourseAssignments();
  });

  $scope.quantity = 5;

});

