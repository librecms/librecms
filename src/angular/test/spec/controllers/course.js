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

  var CourseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CourseCtrl = $controller('CourseCtrl', {
      $scope: scope
    });
  }));

  it('should have all dependencies injected', inject(function($state, $stateParams, CourseService) {
    expect(!!$state).toBe(true);
    expect(!!$stateParams).toBe(true);
    expect(!!CourseService).toBe(true);
  }));

  it('should should transition to main.course', inject(function ($state, $rootScope) {
    $state.transitionTo('main.course');
    $rootScope.$apply();
    expect($state.current.name).toBe('main.course');
  }));
});
