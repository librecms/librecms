'use strict';

angular.module('librecmsApp')
  .controller('NavbarCtrl', function ($scope) {
    console.log('Hello from NavbarCtrl');
    $scope.courses = [
      { 
        name: 'CMPSC483w',
        id: '483'
      },
      {
        name: 'MATH485',
        id: '485'
      },
      {
        name: 'MATH230',
        id: '230'
      },
      {
        name: 'CMPEN362',
        id: 362
      }
    ]
  });
