'use strict';

angular.module('librecmsApp')
  .controller('TimelineCtrl', function($scope, CourseService, Restangular) {

    $scope.posts = [];

    function initializeCourse() {

      var course = CourseService.getCourse();

      //console.log(course);

      if(course) {
        Restangular.one('courses', course._id).getList('posts').then(function(posts) {
          $scope.posts = [];
          // Gather posts from API and reformat their
          // date components into Javascript Date objects
          posts.forEach(function(post) {
            post.date = new Date(post.date);
            $scope.posts.push(post);
          });

          $scope.visiblePosts = $scope.posts.slice(0,2)
        });
      }



      $scope.courseName = $scope.course.name;

      // Get first 20 posts
      //$scope.visiblePosts = $scope.posts.slice(0,2);

      if(!$scope.loadMorePosts) {
        $scope.loadMorePosts = function() {
          $scope.visiblePosts = $scope.posts.slice(0,$scope.visiblePosts.length + 2);
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
