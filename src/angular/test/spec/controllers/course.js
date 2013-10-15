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

  it('should should have an empty test', function () {
  });
});
