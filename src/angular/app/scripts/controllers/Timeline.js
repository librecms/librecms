'use strict';

angular.module('librecmsApp')
  .controller('TimelineCtrl', function ($scope, CourseService) {
    console.log('hello from TimelineCtrl');

    $scope.addPost = function() {
      // This should *eventually* make an HTTP POST and wait for
      // response before doing the "push" below
      $scope.events.push({
        time: 'someTime',
        userText: $scope.announcement
      });
    };
  });
