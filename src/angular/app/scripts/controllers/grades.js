'use strict';

angular.module('librecmsApp')
  .controller('GradesCtrl', function($scope,$stateParams,UserService) {
  
  var attendance = [
    {
      title: 'oct1',
      score: '100'
    },
    {
      title: 'oct2',
      score: '100'
    }
  ];
  var homework = [
    {
      title: 'hw1',
      score: '90',
      average: '42'
    },
    {
      title: 'gEt SoMe',
      score: '3',
      average: '0'
    }
  ];
  var exams = [
    {
      title: 'shit show number 1',
      score: '20',
      average: '25'
    },
    { 
      title: 'shit show number 2: Your still here?',
      score: '18',
      average: '19'
    }
  ];
  var quizzes = [
    {
      title: 'waste of time but required to give this',
      score: '85',
      average: '60'
    }
  ];
  var other = [];
  var all = [];
  all.push.apply(all,attendance);
  all.push.apply(all,exams);
  all.push.apply(all,homework);
  all.push.apply(all,quizzes);
  all.push.apply(all,other);

  // Calculate Homework Average
  var hwAvg = 0;
  for (var i = 0; i < homework.length; i++) {
    hwAvg = (hwAvg + parseInt(homework[i].score)) / (i+1);
  }
  $scope.homeworkAverage = hwAvg + "%";

  // Calculate Quiz Average
  var quizAvg = 0;
  for (var i = 0; i < quizzes.length; i++) {
    quizAvg = (quizAvg + parseInt(quizzes[i].score)) / (i+1);
  }
  $scope.quizAverage = quizAvg + "%";

  // Calculate Quiz Average
  var examAvg = 0;
  for (var i = 0; i < exams.length; i++) {
    examAvg = (examAvg + parseInt(exams[i].score)) / (i+1);
  }
  $scope.examAverage = examAvg + "%";

  //Function to display tab changes in scope
  $scope.changeTab = function(filter) {
    $scope.activeTab = filter;
    if(filter ==="all") {
      $scope.gradeList = all;
    }
    else if(filter ==="attendance") {
      $scope.gradeList = attendance;
    }
    else if(filter === "exams") {
      $scope.gradeList = exams;
    }
    else if(filter === "homework") {
      $scope.gradeList = homework;
    }
    else if(filter === "quizzes") {
      $scope.gradeList = quizzes;
    }
    else if(filter === "other") {
      $scope.gradeList = other;
    }
    else {
      console.log("Error sumtin is a wrong up in heehr.");
    }
  }

  $scope.changeTab('all');
});
