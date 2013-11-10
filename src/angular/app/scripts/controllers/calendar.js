'use strict';

angular.module('librecmsApp')
.controller('CalendarCtrl', function($scope, Restangular) {
  console.log('hello from Calendar.js');
  // Need to massage the URL because URL might change depending on state / 
  // our development so we don't want to explicityly store that in
  // the database
  $scope.$on('UserService.update', function() {
    var startOfThisMonth = moment(new Date()).startOf('month').toDate().getTime();
    $scope.events = [];
    Restangular.one('users', $scope.user._id).getList('events', {start: startOfThisMonth}).then(function(events) {
      $scope.events = events;
      console.log(JSON.stringify($scope.events, null, false));
      $scope.eventSources = $scope.events;
    });
  });

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
      editable: true,
      header:{
        left: '', //'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: ''
      },
      dayClick: $scope.alertEventOnClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize
    }
  };

  /* event sources array */
});
