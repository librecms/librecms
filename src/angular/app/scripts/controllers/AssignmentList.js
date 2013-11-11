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
    
    if ($scope.course && $scope.course.assignments) {
      $scope.contentList = $scope.course.assignments;
    }

    // Listen to changes to the course assignments object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.contentList = $scope.course.assignments;
    });

    //POST new content
    $scope.submit = function() {
      $scope.assignment.post({
        userId : UserService.getUser(),
        title: $scope.newMaterialTitle,
        due : $scope.newMaterialDueDate,
        time : $scope.newMaterialTime,
        description : $scope.newMaterialDescription,
        attachments : $scope.newMaterialAttachments
      });
    };

    //Save content for editing when selected for modal use
    $scope.editModal = function(editContent) {
      $scope.editMaterial = editContent;
    };

    //Update Content Being edited
    $scope.updateContent = function() {
      $scope.assignment.put({
        userId : UserService.getUser(),
        title: $scope.editMaterial.title,
        due: $scope.editMaterial.due,
        time: $scope.editMaterial.time,
        attachments: $scope.editMaterial.attachments,
        description: $scope.editMaterial.description
      });
    };

    //Remove Content
    $scope.removeContent = function() {
      $scope.assignment.del({
        userId : UserService.getUser()
      });
    };

  });
