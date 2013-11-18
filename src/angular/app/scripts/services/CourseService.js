'use strict';

angular.module('librecmsApp')
  .factory('CourseService', function CourseService($rootScope, Restangular) {
    var Courses = Restangular.all('courses');

    var course = {
      name: '',
      id: '',
      posts: [],
      initalized: false
    };

    function setCourse(newCourse) {
      course = newCourse;
      $rootScope.$broadcast('CourseService.courseUpdated');
    }

    function setCourseById(courseId) {
      if (courseId) {
        Courses.get(courseId)
          .then(function(newCourse) {
            setCourse(newCourse);
          });
      }
    }

    function getCourse() {
      return course;
    }

    function getPosts() {
      Courses.get(course._id).getList('posts')
        .then(function(posts) {
          course.posts = posts;
          setCourse(course);
        });
    }

    function createPost(newPost) {
      course.post('posts', newPost)
        .then(function(newPostObject) {
          course.posts.push(newPostObject);
          setCourse(course);
        });
    }

    return {
      setCourse: setCourse,
      setCourseById: setCourseById,
      getCourse: getCourse,
      getPosts: getPosts,
      createPost: createPost
    };
  });
