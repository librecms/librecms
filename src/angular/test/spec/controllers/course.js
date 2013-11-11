'use strict';

describe('Controller: CourseCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  // load controller widgets/views/partials
  var views = [
    'views/course.html',
    'views/main.html'
  ];

  views.forEach(function(view) {
    beforeEach(module(view));
  });

  var CourseCtrl, scope, httpBackend;

  var testUser = {
    'password': '$2a$10$Qorm7q9Gd4jir3dcPH01p',
    '_id': '527840d3123657810a000007',
    '__v': 0,
    'name': {
      'first': 'Zachary',
      'last': 'Wolfe',
      'user': 'zdwolfe'
    }
  };
  var testUserUrl = '/api/users/527840d3123657810a000007';
  var testUserCoursesUrl = '/api/users/527840d3123657810a000007/courses';

  var testCourse = {
    '__v': 0,
    '_id': '527e6abf07340c5955000009',
    'name': 'MATH485',
    'notes': [],
    'exams': [],
    'quizzes': [],
    'assignments': [
      {
        '_id': '527e7a3cd97d4dbf5e00000a',
        'title': 'Assignment 1',
        'posted': 1384020540673,
        'due': 1387602000000,
        'description': 'This is assignment 1s description'
      },
      {
        '_id': '527e7a44d97d4dbf5e00000b',
        'title': 'Assignment 2',
        'posted': 1384020548892,
        'due': 1387602000000,
        'description': 'This is assignment 2s description'
      }
    ],
    'events': [],
    'posts': [
      {
        '_id': '527fb8400ab2a3cc14000008',
        'text': 'new 485 post',
        'date': 1384101952162
      }
    ],
    'students': [
      {
        'userId': '527840d3123657810a000007',
        '_id': '527e6b1207340c595500000c',
        'assessments': [],
        'assignments': []
      }
    ]
  };

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

  var testCourseUrl = '/api/courses/' + testCourse._id;

  function init(stateParams) {
    inject(function($controller, $rootScope) {
      stateParams = stateParams || {
        courseId: testCourse._id
      };

      httpBackend.expectGET(testUserUrl).respond(testUser);
      if (stateParams.courseId) {
        httpBackend.expectGET(testCourseUrl).respond(testCourse);
      }
      httpBackend.expectGET(testUserCoursesUrl).respond(testCourses);
      CourseCtrl = $controller('CourseCtrl', {
        $scope: scope,
        $stateParams: stateParams
      });
      $rootScope.$digest();
      httpBackend.flush();
    });
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
  }));

  it('should initialize course', inject(function() {
    init();
    expect(scope.course).toBeDefined();
    expect(scope.course._id).toBe(testCourse._id);
  }));
});
