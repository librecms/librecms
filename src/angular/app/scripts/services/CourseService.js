'use strict';

angular.module('librecmsApp')
  .factory('CourseService', function CourseService($rootScope) {
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
      // This simulates an asynchronous HTTP/GET to /api/course/1234
      setTimeout(function() {
        var newCourse = {
          id: courseId,
          name: 'course' + courseId
        };
        setCourse(newCourse);
      },0);
    }

    function getCourse() {
      return course;
    }

    return {
      setCourse: setCourse,
      setCourseById: setCourseById,
      getCourse: getCourse
    };
  });
