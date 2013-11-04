'use strict';

angular.module('librecmsApp')
  .factory('CourseService', function CourseService($rootScope, Restangular) {
    var Courses = Restangular.all('courses');

    var course = {
      name: '',
      id: '',
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
      Courses.get(course._id).getList('events')
        .then(function(events) {
          course.events = events;
          setCourse(course);
        });
    }

    return {
      setCourse: setCourse,
      setCourseById: setCourseById,
      getCourse: getCourse,
      getPosts: getPosts
    };
  });
