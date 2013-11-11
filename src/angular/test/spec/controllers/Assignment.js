'use strict';

describe('Controller: AssignmentCtrl', function () {
  
  var testUser = {
    'password': '$2a$10$Qorm7q9Gd4jir3dcPH01p',
    '_id': '527561723e4889199063e34b',
    '__v': 0,
    'name': {
      'first': 'Zachary',
      'last': 'Wolfe',
      'user': 'zdwolfe'
    }
  };
  var testUserUrl = '/api/users/527561723e4889199063e34b';
  var testUserCoursesUrl = '/api/users/527561723e4889199063e34b/courses';


  var testCourses = [
    {
      '_id': '527e6abf07340c5955000009',
      'name': 'MATH485'
    },
    {
      '_id': '527e6aaf07340c5955000008',
      'name': 'CMPEN362'
    },
    {
      '_id': '527e6ac707340c595500000a',
      'name': 'CMPSC483W'
    }
  ];

  var testAssignment = {
    '_id': '527e825833da13ed6b00000a',
    'title': 'Assignment 1',
    'posted': 1384022616455,
    'due': 1387602000000,
    'description': 'This is assignment 1s description'
  };

  var testAssignmentUrl = '/api/courses/527e6ac707340c595500000a/assignments/527e991b8d4c28d47b00000a';

  // load the controller's module
  beforeEach(module('librecmsApp'));

  // load controller widgets/views/partials
  var views = [
    'views/course.assignment.html',
    'views/course.html',
    'views/main.html'
  ];
  views.forEach(function(view) {
    beforeEach(module(view));
  });

  var AssignmentCtrl, scope, httpBackend;

  function initAssignment(stateParams) {
    inject(function($controller, $rootScope) {
      stateParams = stateParams || {
        assignmentId: '527e991b8d4c28d47b00000a',
        courseId: '527e6ac707340c595500000a'
      };

      httpBackend.expectGET(testUserUrl).respond(testUser);
      if (stateParams.assignmentId) {
        httpBackend.expectGET(testAssignmentUrl).respond(testAssignment);
      }
      httpBackend.expectGET(testUserCoursesUrl).respond(testCourses);
      AssignmentCtrl = $controller('AssignmentCtrl', {
        $scope: scope,
        $stateParams: stateParams
      });
      $rootScope.$apply();
      httpBackend.flush();
    });
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
  }));

  it('should HTTP/GET assignment given correct parameters', function () {
    initAssignment();
    expect(scope.assignment).toBeDefined();
    expect(scope.assignment._id).toBe(testAssignment._id);
    expect(scope.assignment.due).toBe(testAssignment.due);
    expect(scope.assignment.posted).toBe(testAssignment.posted);
    expect(scope.assignment.title).toBe(testAssignment.title);
    expect(scope.assignment.description).toBe(testAssignment.description);
  });

  it('should NOT HTTP/GET assignment given incorrect parameters', function() {
    var invalidStateParameters = {
      courseId: '527e6ac707340c595500000a'
    };
    initAssignment(invalidStateParameters);
    expect(scope.assignment).not.toBeDefined();
  });

  /*
   * Not completed yet, as $scope.submit does not actually make POST
  it('should HTTP/POST a submission upon $scope.submit()', function() {
    // First ensure that scope.submit is defined.
    initAssignment();
    expect(typeof(scope.submit)).toBe('function');
  });
  */

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
