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

  $scope.toggleEventStatus = function(e) {
    Restangular.one('users', UserService.getUser()._id).one('events', e._id).post()
    .then(function() {
      // Not Google quality!
      for(var i = 0; i<e.completed.length; i++) {
          if (UserService.getUser()._id === e.completed[i]) {
            e.completed.splice(i,1);
            return;
          }
      }
      e.completed.push(UserService.getUser()._id);
    });
  };

  // determine if user is in passed assignment.completed array
  function interate(completed) {
    for(var i = 0; i<completed.length; i++) {
      if(UserService.getUser()._id === completed[i]) {
        return true;
      }
      return false;
    }
  }

  $scope.applyStrikeClass = function(completed) {
    if(interate(completed)) {
        return "strike";
      }
    return "";
  }
  
  $scope.applyChecboxTick = function(completed) {
    if(interate(completed)) {
        return true;
      }
    return false;
  }

  
  //getCourseAssignments();

  //$scope.$on('CourseService.courseUpdated', getCourseAssignments);

  $scope.$watch('course', function() {
    getCourseAssignments();
  });

  /* event sources array */
  $scope.test = [$scope.events];
  $scope.quantity = 5;

});

