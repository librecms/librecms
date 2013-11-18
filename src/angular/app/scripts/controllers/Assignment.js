'use strict';

angular.module('librecmsApp')
  .controller('AssignmentCtrl',
              function ($scope, $state, UserService,
                        Restangular, $stateParams, $log) {
    var courseId = $stateParams.courseId;
    var assignmentId = $stateParams.assignmentId;

    var Course = Restangular.one('courses', courseId);
    var Assignment = Course.one('assignments', assignmentId);

    if (courseId && assignmentId) {
      Restangular.one('courses', courseId).one('assignments', assignmentId).get().then(function(assignment) {
        $scope.assignment = assignment;
      });
    }

    Course.getList('students')
      .then(function(students) {
        $scope.roster = students.map(function(student) {
          student.name = student.firstName + ' ' + student.lastName;
          return student;
        });
      });

    $scope.toggleCollabs = function() {
      $scope.hideCollabs = $scope.hideCollabs === false ? true : false;
    };

    $scope.submissionCollaborators = [];

    // Adding Collaborator Tag
    $scope.addTag = function(collabName,collabId) {
      // Add collaborator to list of collaborators after checking
      // to make sure the user has not already been added
      var exists = 0;
      for(var i = 0; i < $scope.submissionCollaborators.length; i++) {
        if($scope.submissionCollaborators[i]._id === collabId) {
          exists = 1;
          break;
        }
      }
      if(exists === 0) {
        $scope.submissionCollaborators.push({name: collabName, _id: collabId});
      }
    };
    
    // Removing Collaborator Tag
    $scope.removeTag = function(collabName, collabId) {
      //Remove collaborator from list of collaborators
      for(var i=0;i < $scope.submissionCollaborators.length;i++) {
        if($scope.submissionCollaborators[i]._id === collabId) {
          $scope.submissionCollaborators.splice(i,1);
          break;
        }
      }
    };

    // POST user submission
    $scope.submit = function() {
      if (!$scope.assignment) {
        $log.error('attempting to submit to invalid $scope.assignment.');
        return;
      }
      if (!UserService.getUser() ||
          !UserService.getUser()._id) {
        $log.error('attempting to submit to invalid user');
      }
      var newSubmission = {
        description: $scope.submissionDescription,
        attachments: $scope.submissionAttachments,
        collaborators: $scope.submissionCollaborators
      };
      Assignment.post('submit', newSubmission)
        .then(function(submission) {
          $scope.assignment.submissions = $scope.assignment.submissions || [];
          $scope.assignment.submissions.push(submission);
          $('#submit-modal').modal('hide');
        });
    };
  });
