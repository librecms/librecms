'use strict';

angular.module('librecmsApp')
  .controller('GradesCtrl', function($scope,$stateParams,UserService,Restangular,CourseService,$log) {

  //Get courseId
  var courseId = $stateParams.courseId;
  var Course = Restangular.one('courses',courseId);

  //Get userId
  var userId = UserService.getUser()._id;
 
  //Get Grades for the course
  if ($scope.course && $scope.course.grades) {
    $scope.userGradelist = $scope.course.grades;
  }
  Course.one('users', userId).getList('grades')
    .then(function(grades) {
       $scope.userGradeList = grades;
    });
  
  var attendance = [];
  var homework = [];
  var quizzes = [];
  var exams = [];
  var other = [];

  // Change Tabs to Scroll Select on Mobile/Small Views
  if(window.innerWidth <= 768){
    $scope.gradeTabMobile = true;
  }
  else if (window.innerWidth >768){
    $scope.gradeTabMobile = false;
  }
  window.onresize = function(){
   $log.info('Resized Window');
    if(window.width <= 768){
      $scope.gradeTabMobile = true;
    }
    else{
      $scope.gradeTabMobile = false;
    }
  };

  $scope.userGradeList = $scope.userGradeList || {};
  //Sort Grade List
  for (var i = 0; i < $scope.userGradeList.length; i++) {
    if ($scope.userGradeList[i].type === 'homework') {
      homework.push($scope.userGradeList[i]);
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
  
  // Calculate Homework Average
  var hwAvg = 0;
  for (var i = 0; i < homework.length; i++) {
    hwAvg = (hwAvg + parseInt(homework[i].score)) / (i+1);
  }
  $scope.homeworkAverage = hwAvg + '%';

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
    else if(filter === 'homework') {
      $scope.gradeList = homework;
    }
    else if(filter === 'quizzes') {
      $scope.gradeList = quizzes;
    }
    else if(filter === 'other') {
      $scope.gradeList = other;
    }
    else {
      console.log('Error sumtin is a wrong up in heehr.');
    }
  };

  $scope.changeTab('all');
});
