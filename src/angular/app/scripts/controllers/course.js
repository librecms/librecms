'use strict';

angular.module('librecmsApp')
  .controller('CourseCtrl', function ($scope, $stateParams) {
    console.log('$stateParams.courseId = ' + $stateParams.courseId);
  });
