'use strict';

var dependencies = ['restangular', 'ui.router', 'ui.calendar', 'infinite-scroll', 'ui.date', 'ngCookies', 'truncate'];
angular.module('librecmsApp', dependencies).config(
  function (RestangularProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

    // constant / reusable widget declarations
    var AUTH_WIDGET = {
      templateUrl: 'views/widgets/auth.html',
      controller: 'AuthWidgetCtrl'
    };

    // state declarations
    var states = [];
    var splashState = {
      name: 'splash',
      url: '/',
      views: {
        '@': {
          templateUrl: 'views/splash.html'
        },
        'auth@splash': AUTH_WIDGET
      },
      data: {
        mask: 'public',
        redirect: 'main.user.home'
      }
    };
    states.push(splashState);
    // @TODO add the rest of these and append authentication data
    // to them.

    var loginState = {
      name: 'login',
      url: '/login',
      views: {
        '@': {
          templateUrl: 'views/login.html'
        },
        'auth@login': AUTH_WIDGET
      },
      data: {
        mask: 'public',
        redirect: 'main.user.home'
      }
    };
    states.push(loginState);

    var mainState = {
      name: 'main',
      abstract: true,
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    };
    states.push(mainState);

    var userState = {
      name: 'main.user',
      parent: mainState,
      abstract: true,
      templateUrl: 'views/user.html',
      controller: 'UserCtrl'
    };
    states.push(userState);

    var userHomeState = {
      name: 'main.user.home',
      parent: userState,
      url: '/home',
      views: {
        'timeline@main.user.home': {
          templateUrl: 'views/widgets/timeline.html',
          controller: 'TimelineCtrl' // have to create different controller for this view
        },
        '@main.user': {
          templateUrl: 'views/user.home.html'
        },
        'upcoming@main.user.home': {
          templateUrl: 'views/widgets/eventbar.html',
          controller: 'EventbarCtrl' // have to create different controller for this view
        }
      }
    };
    states.push(userHomeState);

    var courseState = {
      name: 'main.course',
      parent: mainState,
      abstract: true,
      url: '/course/{courseId}',
      templateUrl: 'views/course.html',
      controller: 'CourseCtrl'
    };
    states.push(courseState);

    var courseHomeState = {
      name: 'main.course.home',
      parent: courseState,
      url: '',
      views: {
        'timeline@main.course.home': {
          templateUrl: 'views/widgets/timeline.html',
          controller: 'TimelineCtrl'
        },
        '@main.course': {
          templateUrl: 'views/course.home.html'
        },
        'upcoming@main.course.home': {
          templateUrl: 'views/widgets/eventbar.html',
          controller: 'EventbarCtrl'
        }
      }
    };
    states.push(courseHomeState);

    var calendarState = {
      name: 'main.calendar',
      parent: mainState,
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
    };
    states.push(calendarState);

    var courseAssignmentsState = {
      name: 'main.course.assignments',
      parent: courseState,
      url: '/assignments',
      templateUrl: 'views/course.item.list.html',
      controller: 'AssignmentListCtrl'
    };
    states.push(courseAssignmentsState);

    var courseAssignmentState = {
      name: 'main.course.assignment',
      parent: courseState,
      url: '/assignment/{assignmentId}',
      templateUrl: 'views/course.assignment.html',
      controller: 'AssignmentCtrl'
    };
    states.push(courseAssignmentState);

    var courseQuizState = {
      name: 'main.course.quiz',
      parent: courseState,
      url: '/quiz/{quizId}',
      templateUrl: 'views/course.item.html',
      controller: 'QuizCtrl'
    };
    states.push(courseQuizState);

    var courseQuizzesState = {
      name: 'main.course.quizzes',
      parent: courseState,
      url: '/quizzes',
      templateUrl: 'views/course.item.list.html',
      controller: 'QuizListCtrl'
    };
    states.push(courseQuizzesState);

    var courseExamState = {
      name: 'main.course.exam',
      parent: courseState,
      url: '/exam/{examId}',
      templateUrl: 'views/course.item.html',
      controller: 'ExamCtrl'
    };
    states.push(courseExamState);

    var courseExamsState = {
      name: 'main.course.exams',
      parent: courseState,
      url: '/exams',
      templateUrl: 'views/course.item.list.html',
      controller: 'ExamListCtrl'
    };
    states.push(courseExamsState);

    var courseGradesState = {
      name: 'main.course.grades',
      parent: courseState,
      url: '/grades',
      templateUrl: 'views/course.grades.html',
      controller: 'GradesCtrl'
    };
    states.push(courseGradesState);

    var error404State = {
      name: '404',
      url: '/404',
      templateUrl: 'views/404.html'
    };
    states.push(error404State);

    states.forEach(function(state) {
      $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise('/404');


    // Restangular configuration
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });

    // Intercept HTTP 401 and 404 errors and direct to appropriate paths
    $httpProvider.responseInterceptors.push(function($location, $q) {
      function success(res) {
        return res;
      }
      function error(res) {
        if (res.status === 401) {
          $location.path(loginState.url);
        } else if (res.status === 404) {
          $location.path(error404State.url);
        }
        return $q.reject(res);
      }
      return function(promise) {
        return promise.then(success, error);
      };
    });
  })
  /* Intercept state changes to determine if the current user is 
   *   authorized to transisition to requested state */
  .run(function($rootScope, $state, $log, UserService, AuthService) {
    $rootScope.$on('$stateChangeStart',
      function(event, toState) {
        toState.data = toState.data || { };
        toState.data.mask = toState.data.mask || AuthService.defaultMask;
        toState.data.redirect =
          toState.data.redirect || AuthService.defaultAuthRedirect;
        var mask = toState.data.mask;
        var redirect = toState.data.redirect;
        var role = UserService.getRole();

        // Is the current user authorized to view this state?
        var isAuthorized = AuthService.authorize(role, mask);
        if (!isAuthorized) {
          event.preventDefault();
          $state.go(redirect);
        }
      });
    $rootScope.$on('$stateNotFound', function() {
      $state.go('404');
    });
  });

