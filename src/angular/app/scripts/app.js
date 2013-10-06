'use strict';

angular.module('librecmsApp', ['restangular', 'ui.bootstrap', 'ui.router'])
  .config(function ($locationProvider, RestangularProvider, $stateProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'views/main.html'
      })
      .state('main.user', {
        url: '/user',
        templateUrl: 'views/user.html'
      });

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });
    $locationProvider.html5Mode(true);
  });
