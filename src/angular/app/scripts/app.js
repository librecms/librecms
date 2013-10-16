'use strict';

angular.module('librecmsApp', ['restangular', 'ui.router'])
  .config(function (RestangularProvider, $stateProvider) {

    $stateProvider.state('main', {
      abstract: true,
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .state('main.course', {
      url: '/course/{courseId}',
      templateUrl: 'views/course.html',
      controller: 'CourseCtrl'
    })
    .state('main.course-assignment', {
      url: '/course/{courseId}/assignment/{assignmentId}',
      templateUrl: 'views/course.item.html',
      controller: 'ContentCtrl'
    })
    .state('main.course-assignment-list', {
      url: '/course/{courseId}/assignments',
      templateUrl: 'views/course.item.list.html',
      controller: 'ContentCtrl',
      data: {
        itemType: 'assignment'
      }
    })
    .state('main.course-item-list', {
      url: '/course/{courseId}/items',
      templateUrl: 'views/course.item.list.html',
      controller: 'ContentCtrl',
      data: {
        itemType: 'item'
      }
    });

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });
  });
