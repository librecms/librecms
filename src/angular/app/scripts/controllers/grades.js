'use strict';

angular.module('librecmsApp')
  .controller('GradesCtrl', function($scope,$stateParams,UserService,Restangular,CourseService,$log) {

  //Get courseId
  var courseId = $stateParams.courseId;
  var Course = Restangular.one('courses',courseId);

  //Get Grades for the course
  var attendance = [];
  var assignments = [];
  var quizzes = [];
  var exams = [];
  var other = [];

  $scope.userGradeList = $scope.userGradeList || {};
  //Sort Grade List
  for (var i = 0; i < $scope.userGradeList.length; i++) {
    if ($scope.userGradeList[i].type === 'assignments') {
      assignments.push($scope.userGradeList[i]);
    }
    else if ($scope.userGradeList[i].type === 'attendance') {
      attendance.push($scope.userGradeList[i]);
    }
    else if ($scope.userGradeList[i].type === 'quiz') {
      quizzes.push($scope.userGradeList[i]);
    }
    else if ($scope.userGradeList[i].type === 'exam') {
      exams.push($scope.userGradeList[i]);
    }
    else {
      other.push($scope.userGradeList[i]);
    }
  }
  var all = $scope.userGradeList;
  
  // Calculate Assignments Average
  var hwAvg = 0;
  for (var i = 0; i < assignments.length; i++) {
    hwAvg = (hwAvg + parseInt(assignments[i].score)) / (i+1);
  }
  $scope.assignmentsAverage = hwAvg + '%';

  // Calculate Quiz Average
  var quizAvg = 0;
  for (var i = 0; i < quizzes.length; i++) {
    quizAvg = (quizAvg + parseInt(quizzes[i].score)) / (i+1);
  }
  $scope.quizAverage = quizAvg + '%';

  // Calculate Quiz Average
  var examAvg = 0;
  for (var i = 0; i < exams.length; i++) {
    examAvg = (examAvg + parseInt(exams[i].score, 10)) / (i+1);
  }
  $scope.examAverage = examAvg + '%';

  //Function to display tab changes in scope
  $scope.changeTab = function(filter) {
    $scope.activeTab = filter;
    if(filter ==='all') {
      $scope.gradeList = all;
    }
    else if(filter ==='attendance') {
      $scope.gradeList = attendance;
    }
    else if(filter === 'exams') {
      $scope.gradeList = exams;
    }
    else if(filter === 'assignments') {
      $scope.gradeList = assignments;
    }
    else if(filter === 'quizzes') {
      $scope.gradeList = quizzes;
    }
    else if(filter === 'other') {
      $scope.gradeList = other;
    }
    else {
      $log.error('error in gradeList');
    }
  };

  $scope.changeTab('all');

  Course.getList('grades').then(function(assignmentGradeInfo) {
    $scope.assignmentsAverage = assignmentGradeInfo.assignmentsAverage;
    $scope.assignmentGrades = assignmentGradeInfo.assignments;
    var a = $scope.assignmentsAverage;
    if (a >= 90 && a <= 100) $scope.letterGrade = 'A';
    if (a >= 80 && a < 90) $scope.letterGrade = 'B';
    if (a >= 70 && a < 80) $scope.letterGrade = 'C';
    if (a >= 60 && a < 70) $scope.letterGrade = 'D';
    if (a >= 0 && a < 60) $scope.letterGrade = 'F';
  });
  
});
