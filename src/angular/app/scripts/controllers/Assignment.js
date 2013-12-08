'use strict';

angular.module('librecmsApp')
  .controller('AssignmentCtrl',
    function ($scope, $state, UserService, Restangular,
              $stateParams, $log, UploadService, AuthService, $timeout) {
    var courseId = $stateParams.courseId;
    var assignmentId = $stateParams.assignmentId;
    var Course = Restangular.one('courses', courseId);
    var Assignment = Course.one('assignments', assignmentId);

    $scope.currentDate = (new Date()).getTime();

    $scope.user = UserService.getUser();
    $scope.$on('UserService.update', function() {
      $scope.user = UserService.getUser();
    });

    $scope.hasSuccess = $scope.hasWarning = {};

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

      var submissionIds = assignment.submissions.map(function(submission) {
        return submission._id;
      });
      //Getting list of grades for the assignment
      Restangular.one('courses', courseId)
        .one('assignments', assignmentId)
        .getList('grades', { submissions: submissionIds })
        .then(function(grades) {
          Course.getList('students')
            .then(function(students) {

              // map of student object by student Id 
              var studentByStudentId = {};
              $scope.roster = students.map(function(student) {
                student.name = student.lastName + ' ' + student.firstName;
                studentByStudentId[student._id] = student;
                return student;
              });
              $scope.studentByStudentId = studentByStudentId;

              // Get grades for each submission Id
              var gradesBySubmissionId = {};
              grades.forEach(function(grade) {
                gradesBySubmissionId[grade.submissionId] = grade;
              });
              
              // Massage submissions by appending grade and student id to submission
              $scope.assignment.submissions = $scope.assignment.submissions.map(
              function(submission) {
                submission.grade = gradesBySubmissionId[submission._id];
                // Append student object to submission object
                submission.student = studentByStudentId[submission.studentId];
                return submission;
              });
            });
        });
    }
    //Get Assignment and Submissions
    if (courseId && assignmentId) {
      Restangular.one('courses', courseId).one('assignments', assignmentId).get().then(initAssignment);
    }
    if (AuthService.authorize(UserService.getUser().role, 'student')) {
      Course.getList('students')
        .then(function(students) {
          $scope.roster = students.map(function(student) {
            student.name = student.lastName + ' ' + student.firstName;
            return student;
          });
        });
    }

    $scope.hideCollabs = true;
    $scope.toggleCollabs = function() {
      $scope.hideCollabs = $scope.hideCollabs == false ? true : false;
    };
     
     $scope.searchCollab='';
     $scope.query = function(item){
       // @TODO broken, so I'm commenting out. See https://github.com/librecms/librecms/issues/129
       /*
       return item.name.toUpperCase().contains($scope.searchCollab.toUpperCase());
       */
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

    // Submit grade for submission
    $scope.submitGrade = function(submission) {
      submission.status = 'warning';
      if (!submission.grade) {
        $log.error('trying to make submission without grade');
        return;
      }

      var grade = {
        studentId: submission.studentId,
        studentName: submission.studentName,
        courseId: courseId,
        submissionId: submission._id,
        assignmentId: assignmentId,
        gradeId: submission.grade._id,
        value: submission.grade.value
      };
      Assignment.post('grades', grade)
        .then(
          function() {
            submission.status = 'success';
            $timeout(function() {
              submission.status = 'none';
            }, 1200);
          },
          function(response) {
            submission.status = 'error';
          }
        );
    };

    $scope.getCollaborators = function(collabIds) {
      if (!$scope.studentByStudentId) return;
      return collabIds.map(function(collaborator) {
        return UserService.getNameByUser(
          $scope.studentByStudentId[collaborator]
        );
      });
    };

    $scope.removeAttachment = function(attachment) {
      for (var i = 0; i < $scope.submissionAttachments.length; i++) {
        if ($scope.submissionAttachments[i].basename === attachment.basename) {
          $scope.submissionAttachments.splice(i, 1);
          return;
        }
      }
    };

    $scope.getNameByUser = UserService.getNameByUser;

  });
