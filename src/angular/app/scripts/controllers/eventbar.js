'use strict';

angular.module('librecmsApp')
.controller('EventbarCtrl', function($scope, UserService, Restangular) {

  $scope.events = [];
  $scope.months = [];

  function getUserAssignments() {
    var user = UserService.getUser();
    if(user) {

      var startOfThisMonth = new Date().getTime();
      Restangular.one('users', user._id).getList('events', {start: startOfThisMonth}).then(function(events) {
     
        // Gather assignments from API and reformat their
        // start and end components into Javascript Date objects
        events.forEach(function(assignment) {
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
        });
      });
    }
  }

  $scope.toggleEventStatus = function(e) {
    Restangular.one('users', $scope.user._id).one('events', e._id).post()
    .then(function() {
      // Not Google quality!
      for(var i = 0; i<e.completed.length; i++) {
          if ($scope.user._id === e.completed[i]) {
            e.completed.splice(i,1);
            return;
          }
      }
      e.completed.push($scope.user._id);
    });
  }

  $scope.applyStrikeClass = function(completed) {
    for(var i = 0; i<completed.length; i++) {
      if($scope.user._id === completed[i]) {
        return "strike";
      }
    }
    return "";
  }

  if ($scope.user || $scope.user === undefined) {
    getUserAssignments();
  }

  $scope.$on('UserService.update', getUserAssignments);

  /* event sources array */
  $scope.test = [$scope.events];
  $scope.quantity = 5;

});

