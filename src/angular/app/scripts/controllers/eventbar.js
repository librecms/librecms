'use strict';

angular.module('librecmsApp')
.controller('EventbarCtrl', function($scope, UserService, Restangular) {

  function getUserEvents() {
    var user = UserService.getUser();
    if(user) {
      var startOfThisMonth = new Date().getTime();
      Restangular.one('users', user._id).getList('events', {start: startOfThisMonth}).then(function(events) {
        // Gather events from API and reformat their
        // start and end components into Javascript Date objects
        console.log(JSON.stringify(events));
        $scope.events = events;
        $scope.events.map(function(event) {
          event.start = new Date(event.due);
          event.end = new Date(event.due);
        });
      });
    } 
  }

  $scope.toggleEventStatus = function(param) {
    var Event = Restangular.one('users', $scope.user._id).one('events', param).post();
  }

  if ($scope.user || $scope.user === undefined) {
    getUserEvents();
  }

  $scope.$on('UserService.update', getUserEvents);

  $scope.predicate = 'start';
  $scope.quantity = 5;

});

/*

angular.module('librecmsApp').filter('upcoming', function() {
  return function(e) {
    var date = new Date();
    var returnArray = new Array();
    for(var i = 0; i < e.length; i++) {
      if(date.toISOString() <= e[i].start.toISOString()) {
        returnArray.push(e[i]);
      }
    }
    return returnArray;
  }
});
