'use strict';

angular.module('librecmsApp')
  .controller('AssignmentListCtrl', function($scope, $stateParams) {
    console.log('hello from AssignmentListCtrl');

    var courseId = $stateParams.courseId;
    

    $scope.itemType = "assignment";
    
    //Check if Instructor
    //if (UserService.isInstructor() == true) {
    //  $scope.instructorview = true;
    //}
    $scope.instructorView = true;
    $scope.itemType = 'assignment';

    if ($scope.course && $scope.course.assignments) {
      $scope.contentList = $scope.course.assignments;
    }

    // Listen to changes to the course assignments object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.contentList = $scope.course.assignments;
    });

    //Save content for editing when selected for modal use
    $scope.editModal = function(editContent) {
      $scope.selectedContent = editContent;
    };

  });
