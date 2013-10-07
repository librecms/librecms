'use strict';

angular.module('librecmsApp', ['restangular', 'ui.bootstrap', 'ui.router'])
  .config(function ($locationProvider, RestangularProvider, $stateProvider) {
    var main = {
      abstract: true,
      name: 'main',
      templateUrl: 'views/main.html'
    };

    var user = {
      name: 'user',
      parent: 'main',
      templateUrl: 'views/user.html',
      url: '/user'
    };

    $stateProvider.state(main);
    $stateProvider.state(user);

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });
    $locationProvider.html5Mode(true);
  });
