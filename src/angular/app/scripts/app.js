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
    .state('main.calendar', {
      url: '/calendar',
      templateUrl: 'views/calendar.html',
      controller: 'CalendarCtrl'
    });

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });
  });
