'use strict';

angular.module('librecmsApp', ['restangular', 'ui.router', 'ui.calendar', 'infinite-scroll'])
  .config(function (RestangularProvider, $stateProvider) {

    $stateProvider.state('main', {
      abstract: true,
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .state('main.course', {
      abstract: true,
      url: '/course/{courseId}',
      templateUrl: 'views/course.html',
      controller: 'CourseCtrl'
    })
    .state('main.course.home', {
      url: '',
      views: {
        'timeline@main.course.home': {
          templateUrl: 'views/widgets/timeline.html',
          controller: 'TimelineCtrl'
        },
        '@main.course': {
          templateUrl: 'views/course.home.html'
        }
      }
    })
    .state('main.course.assignmentList', {
      url: '/assignments',
      templateUrl: 'views/course.item.list.html',
      controller: 'AssignmentListCtrl'
    })
    .state('main.course-assignment', {
      url: '/course/{courseId}/assignment/{assignmentId}',
      templateUrl: 'views/course.assignment.html',
      controller: 'AssignmentCtrl'
    })
    .state('main.course.quiz', {
      url: '/quiz/{quizId}',
      templateUrl: 'views/course.item.html',
      controller: 'QuizCtrl'
    })
    .state('main.course.quizList', {
      url: '/quizzes',
      templateUrl: 'views/course.item.list.html',
      controller: 'QuizListCtrl'
    })
    .state('main.course.exam', {
      url: '/exam/{examId}',
      templateUrl: 'views/course.item.html',
      controller: 'ExamCtrl'
    })
    .state('main.course.examList', {
      url: '/exams',
      templateUrl: 'views/course.item.list.html',
      controller: 'ExamListCtrl'
    })
    .state('main.course-note', {
      url: '/course/{courseId}/note/{noteId}',
      templateUrl: 'views/course.assignment.html',
      controller: 'NoteCtrl',
    })
    .state('main.course-notes-list', {
      url: '/course/{courseId}/notes',
      templateUrl: 'views/course.item.list.html',
      controller: 'NoteListCtrl',
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
    .state('main.calendar', {
      url: '/calendar',
      templateUrl: 'views/calendar.html',
      controller: 'CalendarCtrl'
    });

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });
  });
