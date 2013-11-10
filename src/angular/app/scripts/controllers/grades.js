'use strict';

angular.module('librecmsApp')
  .controller('GradesCtrl', function($scope,$stateParams,UserService) {

  $scope.showAll = true;
  $scope.showAttendance = false;
  $scope.showHomework = false;
  $scope.showQuizzes = false;
  $scope.showExams = false;

});
