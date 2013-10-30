'use strict';

angular.module('librecmsApp')
	.controller('CalendarCtrl', function($scope) {
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];

    $scope.predicate = 'start';
    $scope.quantity = 5;

    /* Change View */
    $scope.changeView = function(view,calendar) {
      calendar.fullCalendar('changeView',view);
    };

    $scope.clickSwitch = function(action, calendar) {
      calendar.fullCalendar(action);
    };

    $scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
        $scope.$apply(function(){
          $scope.alertMessage = ('Day Clicked ' + date);
        });
    };
    
    /* alert on Drop */
    $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
        $scope.$apply(function(){
          $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
        });
    };

     /* alert on Resize */
    $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
        $scope.$apply(function(){
          $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
        });
    };
    
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
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
   $scope.eventSources = [$scope.events];
});