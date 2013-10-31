'use strict';

angular.module('librecmsApp')
  .controller('TimelineCtrl', function ($scope) {
  	console.log('hello from TimelineCtrl');
    // API.getEvents(courseId);
    $scope.events = [
      {
        time: '9:30pm',
        userText: 'This is some userText'
      },
      {
        time: '10:30pm',
        userText: 'This is some more userText'
      }
    ];

    $scope.addPost = function() {
      // This should *eventually* make an HTTP POST and wait for
      // response before doing the "push" below
      $scope.events.push({
        time: 'someTime',
        userText: $scope.announcement
      });
    };
  });
