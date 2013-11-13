'use strict';

angular.module('librecmsApp')
  .controller('AssignmentListCtrl', function($scope, $stateParams, UserService, Restangular, $log) {
    console.log('hello from AssignmentListCtrl');

    //Get courseId
    var courseId = $stateParams.courseId;

    //Get API route
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
    //POST new content
    $scope.Submit = function() {
      //Concatenate time due object onto due date object
      moment($scope.newMaterialDueDate).add('hours', $scope.newMaterialTime.getHours());
      moment($scope.newMaterialDueDate).add('minutes', $scope.newMaterialTime.getMinutes());
      moment($scope.newMaterialDueDate).add('seconds', $scope.newMaterialTime.getSeconds());
      console.log("Date is : " + $scope.newMaterialDueDate); 

      //Make API call
      $scope.assignment.post({
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

      //Make API call
      $scope.assignment.put({
        userId : UserService.getUser(),
        title: $scope.editMaterial.title,
        due: $scope.editMaterial.due,
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
