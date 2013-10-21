'use strict';

angular.module('librecmsApp')
  .factory('CourseService', function CourseService($rootScope) {
    var course = {
      name: '',
      id: '',
      initalized: false
    };

    function getCourseById(courseId) {
      console.log('getCourseById courseId = ' + courseId);
      return {
        id: courseId,
        name: 'course' + courseId
      };
    }

    return {
      course: course,
      update: function(newCourse) {
        course = newCourse;
        $rootScope.$broadcast('CourseService.update', course);
      },
      getCourse: function(courseId) {
        console.log('getCourse courseId = ' + courseId);
        if (course.initalized) {
          return course;
        }
        return getCourseById(courseId);
      }
    };
  });
