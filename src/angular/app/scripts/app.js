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
      url: '/user',
      views: {
        'center-widget': {
          templateUrl: 'views/user.html'
        },
        'left-widget': {
          templateUrl: 'views/left-navbar.html'
        }
      }
    };

    /*
      var content = {
        name: 'content',
        parent: 'main',
        url: '/content',
        views: {
          'left-widget': {
            templateUrl: 'views/left-navbar.html'
          },
          'center-widget': {
            templateUrl: 'views/content.html'
          }
        }
      };
    */

    $stateProvider.state(main);
    $stateProvider.state(user);

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });
    $locationProvider.html5Mode(true);
  });
