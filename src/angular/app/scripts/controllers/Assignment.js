'use strict';

angular.module('librecmsApp')
  .controller('AssignmentCtrl', function ($scope, $stateParams, $modal) {
    $scope.assignmentId = $stateParams.assignmentId;
    $scope.assignment = {
      name: 'Homework 5',
      description: 'Do questions 1, 2, 3 and 4 from chapter 5',
      attachments: [
        {
          title: 'SOMEPDF.pdf'
        }
      ]
    };

    $scope.opts = {
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      template: 'views/course.assignment.submit.html'
    };

    $scope.openModal = function(){
      $modal.open($scope.opts);
    };

    $scope.openMessageBox = function(){
      var title = 'This is a message box';
      var msg = 'This is the content of the message box';
      var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary'}];

      $modal.messageBox(title, msg, btns).open();
    };

  });
