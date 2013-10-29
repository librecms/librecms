'use strict';

describe('Controller: CourseCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  var CourseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CourseCtrl = $controller('CourseCtrl', {
      $scope: scope
    });
  }));

  it('should should have an empty test', inject(function ($state, $q) {
    /*
    // This doesn't work, open issue with ui-router team: 
    // https://github.com/angular-ui/ui-router/issues/537
    $state.transitionTo('main.course');
    $q.flush();
    expect($state.current).toBe('main.course');
    */
  }));
});
