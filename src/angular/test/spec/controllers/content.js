'use strict';

describe('Controller: ContentCtrl', function () {

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

  var ContentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContentCtrl = $controller('ContentCtrl', {
      $scope: scope
    });
  }));

  it('should have a list of assignments',
     inject(function($state, $stateParams, CourseService, $rootScope) {
    expect(!!$state).toBe(true);
    expect(!!$stateParams).toBe(true);
    expect(!!CourseService).toBe(true);
    $state.transitionTo('main.course-assignment-list', {
      courseId: '1234'
    });
    $rootScope.$apply();

    expect($state.current.name).toBe('main.course-assignment-list');

    scope.setItemType();
    expect(scope.contentList).toBeDefined();

    // Test each item in contentList to be a valid 'assignment'
    scope.contentList.forEach(function(item) {
      expect(item.id).toBeDefined();
      expect(item.name).toBeDefined();
      expect(item.due).toBeDefined();
      expect(item.posted).toBeDefined();
    });
  }));
});
