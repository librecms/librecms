'use strict';

angular.module('librecmsApp', ['restangular', 'ui.router', 'ui.calendar', 'infinite-scroll', 'ui.date'])
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
    .state('main.calendar', {
      url: '/calendar',
      views: {
        '@main': {
          controller: 'CalendarCtrl',
          templateUrl: 'views/calendar.html'
        },
        '@main.calendar': {
          templateUrl: 'views/widgets/eventbar.html',
          controller: 'EventbarCtrl'
        }
      }
    })
    .state('main.course.assignments', {
      url: '/assignments',
      templateUrl: 'views/course.item.list.html',
      controller: 'AssignmentListCtrl'
    })
    .state('main.course.assignment', {
      url: '/assignment/{assignmentId}',
      templateUrl: 'views/course.assignment.html',
      controller: 'AssignmentCtrl'
    })
    .state('main.course.quiz', {
      url: '/quiz/{quizId}',
      templateUrl: 'views/course.item.html',
      controller: 'QuizCtrl'
    })
    .state('main.course.quizzes', {
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
    });

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });
  });
