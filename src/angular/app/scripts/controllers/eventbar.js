'use strict';

angular.module('librecmsApp')
.controller('EventbarCtrl', function($scope) {

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  $scope.events = [
  {title: 'Homework Click here!',start: new Date(y, m, 1), url: 'http://localhost/#/course//assignment/1'},
  {title: 'really upcomming',start: new Date(y, m, d+1), url: 'http://localhost/#/course//assignment/1'}
  ];

  /* event sources array */
  $scope.test = [$scope.events];

  $scope.predicate = 'start';
  $scope.quantity = 5;
});

angular.module('librecmsApp').filter('upcoming', function() {
  return function(e) {
    var date = new Date();
    console.log(date);
    console.log(e)
    if(true) {
      return e;
    }
  }
});