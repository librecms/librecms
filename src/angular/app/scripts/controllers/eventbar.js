'use strict';

angular.module('librecmsApp')
.controller('EventbarCtrl', function($scope, Restangular) {
console.log('hello from eventbar.js');
  

  function getUserEvents() {
    if($scope.user) {
      var startOfThisMonth = moment(new Date()).startOf('month').toDate().getTime();
      Restangular.one('users', $scope.user._id).getList('events', {start: startOfThisMonth}).then(function(events) {
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


  if ($scope.user) {
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
