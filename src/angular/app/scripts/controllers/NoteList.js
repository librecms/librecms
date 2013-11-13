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

    $scope.newMaterialTime = new Date(0,0,0,8,4,2);

    //POST new content
    $scope.submit = function() {
      //Concatenate time due object onto due date object
      moment($scope.newMaterialDueDate).add('hours', $scope.newMaterialTime.getHours());
      moment($scope.newMaterialDueDate).add('minutes', $scope.newMaterialTime.getMinutes());
      moment($scope.newMaterialDueDate).add('seconds', $scope.newMaterialTime.getSeconds());

      $scope.note.post({
        userId : UserService.getUser(),
        title: $scope.newMaterialTitle,
        due : $scope.newMaterialDueDate,
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
      //Concatenate time due object onto due date object
      moment($scope.newMaterialDueDate).add('hours', $scope.newMaterialTime.getHours());
      moment($scope.newMaterialDueDate).add('minutes', $scope.newMaterialTime.getMinutes());
      moment($scope.newMaterialDueDate).add('seconds', $scope.newMaterialTime.getSeconds());

      $scope.note.put({
        userId : UserService.getUser(),
        title: $scope.editMaterialTitle,
        due: $scope.editMaterialDueDate,
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
