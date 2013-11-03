'use strict';

angular.module('librecmsApp')
  .factory('CourseService', function CourseService($rootScope) {
    var course = {
      name: '',
      id: '',
      initalized: false
    };
    
    function update(newCourse) {
      course = newCourse;
      $rootScope.$broadcast('CourseService.update', course);
      return course;
    }

    function updateCourseById(courseId) {
      console.log('updateCourseById courseId = ' + courseId);
      var newCourse = {
        id: courseId,
        name: 'course' + courseId
      };
      return update(newCourse);
    }

    return {
      course: course,
      update: update,
      getCourse: function(courseId) {
        if (course.initalized) {
          return course;
        }
        return updateCourseById(courseId);
      }
    };
  });
