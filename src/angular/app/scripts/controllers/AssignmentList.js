'use strict';

angular.module('librecmsApp')
  .controller('AssignmentListCtrl',
    function($scope, $stateParams, UserService,
             Restangular, $log, CourseService, UploadService ) {

    //Get courseId
    var courseId = $stateParams.courseId;
    var Course = Restangular.one('courses', courseId);

    //Get API route for posting new assignment
    if(courseId) {
      Restangular.one('courses', courseId).get().then(function(newAssignment) {
        $scope.newAssignment = newAssignment;
      }); }

    //Set itemType
    $scope.itemType = "assignment";
    
    $scope.instructorView = true;
   
    if ($scope.course && $scope.course.assignments) {
      $scope.contentList = $scope.course.assignments;
    }

    // Listen to changes to the course assignments object
    $scope.$on('CourseService.courseUpdated', function() {
      $scope.contentList = $scope.course.assignments;
    });

    //Temporary: Set static due time
    $scope.editMaterial = {};
    $scope.editMaterial.due = new Date();
    //POST new content
    $scope.Submit = function() {
      //Make API call
      var newAssignment = {
        userId : UserService.getUser(),
        title: $scope.editMaterialTitle,
        due : $scope.editMaterial.due.getTime(),
        description : $scope.editMaterial.description,
        points: $scope.editMaterialPoints,
        attachments : $scope.attachments
      };

      // @TODO what happens on 401 or 404 or 500 or 502?
      Restangular.one('courses', courseId)
        .post('assignments', newAssignment)
        .then(function(assignment) {
          $scope.contentList.push(assignment);
          $('#new-assignment-submit-modal').modal('hide');
        });
    };

    //Save content for editing when selected for modal use
    $scope.editModal = function(editContent) {
      $scope.editMaterial = editContent;
      $log.info(JSON.stringify($scope.editMaterial));
    };

    //Update Content Being edited
    $scope.updateContent = function(assignmentId) {
      //Get Assignment Route
      var assignment = Course.one('assignments', $scope.editMaterial._id);  

      //Set new information from edit
      var updateAssignment = {
        userId : UserService.getUser(),
        title: $scope.editMaterial.title,
        due: $scope.editMaterial.due,
        attachments: $scope.editMaterial.attachments,
        description: $scope.editMaterial.description
      };
      
      //Make API call to update
      assignment.put('assignments', updateAssignment)
        .then(function(assignment) {
          $('#edit-assignment-modal').modal('hide');
        });
    };

    //Remove Content
    $scope.removeContent = function() {
      if (!$scope.editMaterial || !$scope.editMaterial._id) {
        $log.error('attempt to edit material without setting editMaterial');
        return;
      }
      Course.one('assignments', $scope.editMaterial._id)
        .remove().then(function(assignments) {
          $scope.editMaterial = {};
          var newCourse = $scope.course || {};
          newCourse.assignments = assignments;
          CourseService.setCourse(newCourse);
          $('#remove-modal').modal('hide');
        });
    };

    function addAttachments(newFiles) {
      $scope.attachments =
        $scope.attachments || [];
      $scope.attachments =
        $scope.attachments.concat(newFiles);
    };

    $scope.addNewAssignmentAttachments = function(files) {
      UploadService.upload(files, addAttachments);
    };

    $scope.removeAttachment = function(attachment) {
      for (var i = 0; i < $scope.attachments.length; i++) {
        if ($scope.attachments[i].basename === attachment.basename) {
          $scope.attachments.splice(i, 1);
          return;
        }
      }
    };
  });
