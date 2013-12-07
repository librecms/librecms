'use strict';

angular.module('librecmsApp')
  .controller('TimelineCtrl', function ($scope, CourseService) {
    console.log('TimelineCtrl');


    function initializeCourse() {
        $scope.courseName = $scope.course.name;

        // Get first 20 posts
        $scope.visiblePosts = $scope.course.posts.slice(-2);

        if(!$scope.loadMorePosts) {
          $scope.loadMorePosts = function() {
            $scope.visiblePosts = $scope.course.posts.slice(-1*($scope.visiblePosts.length + 2));
          };
        }
      };

    if($scope.course) {
      initializeCourse();
    }

    // Listen to changes to the course object
    $scope.$on('CourseService.courseUpdated', initializeCourse);

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

    $scope.addPostByCourseId = function(courseId) {
      if(courseId){
        console.log('adding post by course id')

        var newPost = {
          date: (new Date()).getTime(),
          text: $scope.announcement,
          generated: false
        };

        CourseService.createPostByCourseId(newPost, courseId);
      }
    };

  });
