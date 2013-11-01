'use strict';

angular.module('librecmsApp')
  .controller('ContentCtrl', function ($state, $scope, UserService, CourseService,
                                       $stateParams) {
    console.log('hello from ContentCtrl');

    $scope.instructorView = true;
    /*if (UserService.isInstructor() == true) {
      $scope.instructorView = true;
    }*/
    $scope.dateOptions = {
      yearRange:'1900:-0'
    };

    var assignments = [
    ];

    for (var i = 0; i < 50; i++) {
      var id = Math.floor((Math.random()*10)+1);
      assignments.push({
        id: id,
        name: 'assignment' + i,
        due: id,
        posted: id
      });
    }

    var notes = [
      {
        id: '483',
        name: 'compilers',
        type: 'lecture',
        due: '',
        posted: '9/11/2013',
        attachment: true
      },
      {
        id: '20',
        name: 'assembly',
        type: 'notes',
        due: '',
        posted: '9/8/2013',
        attachment: false
      }
    ];

    var quizzes = [
      {
        id: '362',
        name: 'quiz1',
        type: 'quiz',
        due: '9/14/2013',
        posted: '9/13/2013'
      }
    ];

    var exams = [
      {
        id: '2',
        name: 'exam1',
        type: 'exam',
        due: '10/13/2013',
        posted: '10/1/2013'
      }
    ];

    $scope.setItemType = function() {
      $scope.itemType = $state.current.data.itemType;
      $scope.course = CourseService.getCourse($stateParams.courseId);

      if ($scope.itemType === 'assignment') {
        $scope.contentList = assignments;
      }
      else if ($scope.itemType === 'quiz') {
        $scope.contentList = quizzes;
      }
      else if ($scope.itemType === 'exam') {
        $scope.contentList = exams;
      }
      else if ($scope.itemType === 'note') {
        $scope.contentList = notes;
      }
    };

    if($state.current.data && $state.current.data.itemType) {
      $scope.setItemType();
    }
  });
