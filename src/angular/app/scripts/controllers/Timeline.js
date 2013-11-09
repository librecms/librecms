'use strict';

angular.module('librecmsApp')
  .controller('TimelineCtrl', function ($scope, CourseService) {
    console.log('hello from TimelineCtrl');

    // Listen to changes to the course object
    $scope.$on('CourseService.courseUpdated', function() {
      // Get first 20 posts
      $scope.visiblePosts = $scope.course.posts.slice(-2);

      if(!$scope.loadMorePosts) {
        $scope.loadMorePosts = function() {
          $scope.visiblePosts = $scope.course.posts.slice(-1*($scope.visiblePosts.length + 2));
        };
      }
    });

    $scope.addPost = function() {
      // This should *eventually* make an HTTP POST and wait for
      // response before doing the "push" below

      console.log('adding post');

      var newPost = {
        date: (new Date()).getTime(),
        text: $scope.announcement,
        generated: false
      };

      CourseService.createPost(newPost);
    };

  });
