'use strict';

angular.module('librecmsApp')
  .controller('ContentCtrl', function ($scope) {
    console.log('hello from ContentCtrl');

    $scope.content = [
      { 
        name: 'Agile',
        id: '1',
	type: 'Lecture'
      },
      {
        name: 'Waterfall',
        id: '2',
	type: 'Lecture',
      },
      {
        name: 'System Design',
        id: '3',
	type: 'Lecture'
      },
      {
        name: 'Testing',
        id: '4',
	type: 'Lecture'
      },
      {
	name: 'Quiz 1',
	id: '5',
	type: 'Quiz'
      },
      {
	name: 'Homework 1',
	id: '6',
	type: 'Homework'
      }
   ]
  });
