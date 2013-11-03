'use strict';

describe('Controller: AssignmentCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  // load controller widgets/views/partials
  var views = [
    'views/course.item.list.html',
    'views/main.html'
  ];

  views.forEach(function(view) {
    beforeEach(module(view));
  });

  var AssignmentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssignmentCtrl = $controller('AssignmentCtrl', {
      $scope: scope
    });
  }));

  it('should should transition to assignment list state', 
     inject(function ($state, $stateParams, $rootScope) {
    $state.transitionTo('main.course-assignment-list', {
      courseId: '1234'
    });
    $rootScope.$apply();
    expect($state.current.name).toBe('main.course-assignment-list');
    expect($stateParams.courseId).toBe('1234');
  }));
});
