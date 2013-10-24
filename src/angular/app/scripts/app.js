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
      templateUrl: 'views/course.assignment.html',
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
        itemType: 'quiz'
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
        itemType: 'exam'
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
        itemType: 'note'
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
    .state('main.course-timeline', {
      url: '/course/{courseId}/timeline',
      templateUrl: 'views/widgets/timeline.html',
      controller: 'TimelineCtrl'
    });

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });
  });
