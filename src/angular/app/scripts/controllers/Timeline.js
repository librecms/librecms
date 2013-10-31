'use strict';

angular.module('librecmsApp')
  .controller('TimelineCtrl', function ($scope) {
    console.log('hello from TimelineCtrl');
    // API.getEvents(courseId);
    $scope.events = [
      {
        time: '9:30pm',
        professorText: 'This is some userText',
        courseName: 'CMPSC 483W',
        professorName: 'Max Fomitchev',
        paletteName: 'lightred'
      },
      {
        time: '10:30pm',
        professorText: 'This is some more userText',
        courseName: 'CMPSC 455',
        professorName: 'Xiantao Li',
        paletteName: 'lightyellow'
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
