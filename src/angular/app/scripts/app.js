'use strict';

angular.module('librecmsApp', ['restangular', 'ui.router', 'ui.calendar'])
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
        itemType: 'assignments'
      }
    })
    .state('main.course-quiz', {
      url: '/course/{courseId}/quiz/{quizId}',
      templateUrl: 'views/course.item.html',
      controller: 'ContentCtrl',
    })
    .state('main.course-quiz-list', {
      url: '/course/{courseId}/quizzes',
      templateUrl: 'views/course.item.list.html',
      controller: 'ContentCtrl',
      data: {
        itemType: 'quizzes'
      }
    })
    .state('main.course-exam', {
      url: '/course/{courseId}/exam/{examId}',
      templateUrl: 'views/course.item.html',
      controller: 'ContentCtrl',
    })
    .state('main.course-exam-list', {
      url: '/course/{courseId}/exams',
      templateUrl: 'views/course.item.list.html',
      controller: 'ContentCtrl',
      data: {
        itemType: 'exams'
      }
    })
    .state('main.course-note', {
      url: '/course/{courseId}/notes/{noteId}',
      templateUrl: 'views/course.item.html',
      controller: 'ContentCtrl',
    })
    .state('main.course-notes-list', {
      url: '/course/{courseId}/notes',
      templateUrl: 'views/course.item.list.html',
      controller: 'ContentCtrl',
      data: {
        itemType: 'notes'
      }
    })
    .state('main.course-item-list', {
      url: '/course/{courseId}/items',
      templateUrl: 'views/course.item.list.html',
      controller: 'ContentCtrl',
      data: {
        itemType: 'item'
      }
    })
    .state('main.calendar', {
      url: '/calendar',
      templateUrl: 'views/calendar.html',
      controller: 'CalendarCtrl'
    });

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });
  });
