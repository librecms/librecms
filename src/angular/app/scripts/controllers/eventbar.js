'use strict';

angular.module('librecmsApp')
.controller('EventbarCtrl', function($scope, UserService, Restangular) {

  function getUserEvents() {
    var user = UserService.getUser();
    if(user) {
      var startOfThisMonth = moment(new Date()).startOf('month').toDate().getTime();
      Restangular.one('users', user._id).getList('events', {start: startOfThisMonth}).then(function(events) {
        // Gather events from API and reformat their
        // start and end components into Javascript Date objects
        $scope.events = events;
        $scope.events.map(function(event) {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
        });
      });
    } 
  }

  $scope.events = [];

  if ($scope.user || $scope.user === undefined) {
    getUserEvents();
  }

  $scope.$on('UserService.update', getUserEvents);

  /* event sources array */
  $scope.test = [$scope.events];

  $scope.predicate = 'start';
  $scope.quantity = 5;

});

angular.module('librecmsApp').filter('upcoming', function() {
  return function(e) {
    var date = new Date();
    var returnArray = new Array();
    for(var i = 0; i < e.length; i++) {
      if(date.getTime() <= e[i].start.getTime()) {
        returnArray.push(e[i]);
      }
    }
    return returnArray;
  }
});
