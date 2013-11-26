'use strict';

angular.module('librecmsApp')
.controller('CalendarCtrl', function($scope, Restangular) {

  function getUserEvents() {
    var startOfThisMonth = moment(new Date()).startOf('month').toDate().getTime();
    Restangular.one('users', $scope.user._id).getList('events', {start: startOfThisMonth}).then(function(events) {
      // Gather events from API and reformat their
      // start and end components into Javascript Date objects
      $scope.events = events;
      $scope.events.map(function(event) {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
      });
      $scope.eventSources.push($scope.events);
    });
    console.log(JSON.stringify($scope.eventSources));
  }

  $scope.events = [];
  $scope.eventSources = $scope.events;

  if ($scope.user && $scope.user._id) {
    getUserEvents();
  }

  $scope.$on('UserService.update', getUserEvents);

  /* Change View */
  $scope.changeView = function(view,calendar) {
    calendar.fullCalendar('changeView',view);
  };

  $scope.clickSwitch = function(action, calendar) {
    calendar.fullCalendar(action);
  };

  /* config object */
  $scope.uiConfig = {
    calendar:{
      height: 600,
      editable: false,
      header:{
        left: '', //'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: ''
      }
    }
  };
});
