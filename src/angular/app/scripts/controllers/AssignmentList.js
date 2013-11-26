'use strict';

angular.module('librecmsApp')
  .controller('AssignmentListCtrl',
    function($scope, $stateParams, UserService,
             Restangular, $log, CourseService) {

    //Get courseId
    var courseId = $stateParams.courseId;
    var Course = Restangular.one('courses', courseId);

    //Get API route for posting new assignment
    if(courseId) {
      Restangular.one('courses', courseId).get().then(function(newAssignment) {
        $scope.newAssignment = newAssignment;
      });
    }

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
    $scope.newMaterialTime = new Date(0,0,0,8,4,2);
    $scope.newMaterialDueDate = new Date();
    //POST new content
    $scope.Submit = function() {
      //Concatenate time due object onto due date object
      moment($scope.newMaterialDueDate).add('hours', $scope.newMaterialTime.getHours());
      moment($scope.newMaterialDueDate).add('minutes', $scope.newMaterialTime.getMinutes());
      moment($scope.newMaterialDueDate).add('seconds', $scope.newMaterialTime.getSeconds());
      console.log("Date is : " + $scope.newMaterialDueDate);

      //Make API call
      var newAssignment = {
        userId : UserService.getUser(),
        title: $scope.newMaterialTitle,
        due : $scope.newMaterialDueDate.getTime(),
        description : $scope.newMaterialDescription,
        attachments : $scope.newMaterialAttachments
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
    };

    //Update Content Being edited
    $scope.updateContent = function(assignmentId) {
      //Concatenate time due object onto due date object
      moment($scope.newMaterialDueDate).add('hours', $scope.newMaterialTime.getHours());
      moment($scope.newMaterialDueDate).add('minutes', $scope.newMaterialTime.getMinutes());
      moment($scope.newMaterialDueDate).add('seconds', $scope.newMaterialTime.getSeconds());

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
      $log.info(JSON.stringify($scope.editMaterial, null, 4));
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

  });
