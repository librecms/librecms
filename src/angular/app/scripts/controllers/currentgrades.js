'use strict';

angular.module('librecmsApp')
  .controller('CurrentGradesCtrl',
    function (Restangular, $log, UserService, $scope) {
      function initCurrentGradesWidget() {
        var user = UserService.getUser();
        if (!user || !user._id)  {
          $log.error('error initializing currentgradeswidget');
        }
        Restangular.one('users', user._id).getList('grades')
          .then(function(gradesInfo) {
            gradesInfo = gradesInfo.map(function(gradeInfo) {
              var a = gradeInfo.average;
              if (a >= 90 && a <= 100) gradeInfo.letterGrade = 'A';
              if (a >= 80 && a < 90) gradeInfo.letterGrade = 'B';
              if (a >= 70 && a < 80) gradeInfo.letterGrade = 'C';
              if (a >= 60 && a < 70) gradeInfo.letterGrade = 'D';
              if (a >= 0 && a < 60) gradeInfo.letterGrade = 'F';
              return gradeInfo;
            });
            $scope.gradesInfo = gradesInfo;
          });
      }

      initCurrentGradesWidget();
    });
