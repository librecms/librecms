'use strict';

angular.module('librecmsApp')
.controller('EventbarCtrl', function($scope) {

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  $scope.events = [
  {title: 'Homework Click here!',start: new Date(y, m, 1), url: 'http://localhost/#/course//assignment/1'},
  {title: 'really upcomming',start: new Date(y, m, d+1), url: 'http://localhost/#/course//assignment/1'},
  {title: 'Homework Click here!',start: new Date(y, m, 1), url: 'http://localhost/#/course//assignment/1'},
  {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
  {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
  {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
  {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
  {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
  ];

  /* event sources array */
  $scope.test = [$scope.events];

  $scope.predicate = 'start';
  $scope.quantity = 5;

  $scope.getEvents = function() {
  EventbarService.getEvents();
  }
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
