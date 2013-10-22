'use strict';

angular.module('librecmsApp')
  .controller('ContentCtrl', function ($state, $scope, CourseService,
                                       $stateParams) {
    console.log('hello from ContentCtrl');

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

    try {
      console.log('ContentCtrl state.itemtype = ' +
          $state.current.data.itemType);
      $scope.itemType = $state.current.data.itemType;

      var courseId = $stateParams.courseId;
      $scope.course = CourseService.getCourse(courseId);

      if ($state.current.data.itemType === 'assignments') {
        $scope.content = assignments;
      }
      else if ($state.current.data.itemType === 'quizzes') {
        $scope.content = quizzes;
      }
      else if ($state.current.data.itemType === 'exams') {
        $scope.content = exams;
      }
      else if ($state.current.data.itemType === 'notes') {
        $scope.content = notes;
      }
      console.log('content = ' + JSON.stringify($scope.content));
    } catch(err) { }
  });
