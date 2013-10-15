'use strict';

angular.module('librecmsApp', ['restangular', 'ui.router'])
  .config(function (RestangularProvider, $stateProvider) {
    var main = {
      abstract: true,
      name: 'main',
      templateUrl: 'views/main.html'
    };

    var course = {
      name: 'course',
      parent: 'main',
      url: '/course/{courseId}',
      templateUrl: 'views/course.html',
      controller: 'CourseCtrl'
    };
    
    /* Also have grades, etc */

    $stateProvider.state(main);
    $stateProvider.state(course);

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });
  });
