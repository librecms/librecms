'use strict';

angular.module('librecmsApp')
  .controller('NoteListCtrl', function($scope) {
    console.log('hello from NoteListCtrl');

    var courseId = $stateParams.courseId;

    $scope.itemType = "note";
    
    //Check if Instructor
    //if (UserService.isInstructor() == true) {
    //  $scope.instructorview = true;
    //}
    $scope.instructorView = true;
    
    if ($scope.course && $scope.course.notes) {
      $scope.contentList = $scope.course.notes;
    }

    // Listen to changes to the course notes object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.contentList = $scope.course.notes;
    });

    //POST new content
    $scope.submit = function() {
      $scope.note.post({
        userId : UserService.getUser(),
        due : $scope.newMaterialDueDate,
        time : $scope.newMaterialTime,
        description : $scope.newMaterialDescription,
        attachments : $scope.newMaterialAttachments
      });
    };

    //Save content for editing when selected for modal use
    $scope.editModal = function(editContent) {
      $scope.selectedContent = editContent;
    };

    //Update Content Being edited
    $scope.updateContent = function() {
      $scope.note.put({
        userId : UserService.getUser(),
        due: $scope.editMaterialDueDate,
        time: $scope.editMaterialTime,
        attachments: $scope.editMaterialAttachments,
        description: $scope.editMaterialDescription
      });
    };

    //Remove Content
    $scope.removeContent = function() {
        $scope.note.del({
          userId : UserService.getUser()
      });
    };

  });
