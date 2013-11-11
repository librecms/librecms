'use strict';

angular.module('librecmsApp')
  .controller('AssignmentCtrl',
              function ($scope, $state, UserService,
                        Restangular, $stateParams, $log) {
    var courseId = $stateParams.courseId;
    var assignmentId = $stateParams.assignmentId;
    if (courseId && assignmentId) {
      Restangular.one('courses', courseId).one('assignments', assignmentId).get().then(function(assignment) {
        $scope.assignment = assignment;
      });
    }

    $scope.roster = [
      {
        name: 'Nick',
        _id: '123'
      },
      {
        name: 'Marius',
        _id: '945'
      },
      {
        name: 'Zach',
        _id: '425'
      },
      {
        name: 'Jessie',
        _id: '657'
      },
      {
        name: 'Mike',
        _id: '838'
      },
      {
        name: 'Shawn',
        _id: '454'
      },
      {
        name: 'Tiffany',
        _id: '324'
      }
    ];

    $scope.showSubmit = true;
    $scope.hideCollabs = true;
    $scope.toggleCollabs = function() {
      $scope.hideCollabs = $scope.hideCollabs === false ? true : false;
    };

    // Adding Collaborator Tag
    $scope.addTag = function(collabName,collabId) {

      //Add collaborator to list of collaborators
      $scope.submissionCollaborators.push({name: collabName, _id: collabId});
      console.log($scope.submissionCollaborators);
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
        $log.warn('attempting to submit to invalid $scope.assignment.');
        return;
      }
      $scope.assignment.post({
        userId : UserService.getUser(),
        description: $scope.submissionDescription,
        attachments: $scope.submissionAttachments,
        collaborators: $scope.submissionCollaborators
      });
    };
  });
