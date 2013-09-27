'use strict';

angular.module('librecmsApp', ['restangular'])
  .config(function ($routeProvider, $locationProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    RestangularProvider.setBaseUrl('/api');
    $locationProvider.html5Mode(true);
  });
