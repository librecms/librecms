'use strict';

angular.module('librecmsApp')
  .factory('EventbarService', function EventbarService($rootScope, Restangular) {
    var courseId;
    var Event = Restangular.all('courses')
      .then(function(course) {
        courseId = course[0];
      });


    $scope.allCourses = allCourses.getList();

    var event = {
      id: '',
      title: '',
      start: '',
      url: ''
    };

    function getEvents() {
      console.log(courseId);
      console.log(Event.getList('events'));
    }

    return {
      getEvents: getEvents
    };
});