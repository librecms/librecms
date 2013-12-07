'use strict';

angular.module('librecmsApp')
  .controller('AssignmentCtrl',
    function ($scope, $state, UserService, Restangular,
              $stateParams, $log, UploadService, AuthService) {
    var courseId = $stateParams.courseId;
    var assignmentId = $stateParams.assignmentId;
    var Course = Restangular.one('courses', courseId);
    var Assignment = Course.one('assignments', assignmentId);

    //Getting list of grades for the assignment
    if (AuthService.authorize(UserService.getUser().role, 'instructor')) {
      $scope.gradesList = Restangular.one('courses', courseId).one('assignments', assignmentId).getList('grades');
    }

    function initAssignment(assignment) {
      // Get all Student Submissions for assignment
      var submissionsByStudentId = {};
      assignment.submissions.forEach(function(submission) {
        if (submissionsByStudentId.hasOwnProperty(submission.studentId)) {
          if (submission.posted > submissionsByStudentId[submission.studentId].posted) {
            submissionsByStudentId[submission.studentId] = submission;
          }
        } else {
          submissionsByStudentId[submission.studentId] = submission;
        }
      });

      var submissions = [];
      Object.keys(submissionsByStudentId).forEach(function(key) {
        submissions.push(submissionsByStudentId[key]);
      });

      assignment.submissions = submissions;
      $scope.assignment = assignment;
    }
    //Get Assignment and Submissions
    if (courseId && assignmentId) {
      Restangular.one('courses', courseId).one('assignments', assignmentId).get().then(initAssignment);
    }

    Course.getList('students')
      .then(function(students) {
        $scope.roster = students.map(function(student) {
          student.name = student.firstName + ' ' + student.lastName;
          return student;
        });
      });

    $scope.hideCollabs = true;
    $scope.toggleCollabs = function() {
      $scope.hideCollabs = $scope.hideCollabs == false ? true : false;
    };

        
    // Cancel/Discard Submission
    $scope.discardSubmission = function(){
      $scope.submissionDescription = '';
      $scope.query = '';
      $scope.hideCollabs = true;
      for(var i=0;i < $scope.submissionCollaborators.length;i++) {
        $scope.submissionCollaborators.splice(i,$scope.submissionCollaborators.length);
      }
      $scope.submissionAttachments = [];
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
        studentName: UserService.getUser().firstName + ' ' + UserService.getUser().lastName,
        description: $scope.submissionDescription,
        attachments: $scope.submissionAttachments,
        collaborators: $scope.submissionCollaborators,
      };
      Assignment.post('submit', newSubmission)
        .then(function(submission) {
          $scope.assignment.submissions = $scope.assignment.submissions || [];
          $scope.assignment.submissions.push(submission);
          $('#submit-modal').modal('hide');
        });
    };

    // Borrowed from https://github.com/danialfarid/angular-file-upload, more or less
    function addAttachments(newFiles) {
      $scope.submissionAttachments =
        $scope.submissionAttachments || [];
      $scope.submissionAttachments =
        $scope.submissionAttachments.concat(newFiles);
    }

    $scope.uploadFiles = function(files) {
      UploadService.upload(files, addAttachments);
    };

    //Set student submission being graded
    $scope.gradeStudent = function(studentSubmission) {
      console.log("selected submission: " + JSON.stringify(studentSubmission));
      $scope.gradedStudent = studentSubmission;
    };

    //Grade Button filter to submit new grade or edit grade
    $scope.gradeButton = true;

    // Submit grade for submission
    $scope.submitGrade = function(submission, value) {
    };
    
    //Update grade for submission
    $scope.updateGrade = function() {
      Course.one('assignments', assignmentId)
        .getList('grades').put();
    };

    $scope.removeAttachment = function(attachment) {
      for (var i = 0; i < $scope.submissionAttachments.length; i++) {
        if ($scope.submissionAttachments[i].basename === attachment.basename) {
          $scope.submissionAttachments.splice(i, 1);
          return;
        }
      }
    };

  });
