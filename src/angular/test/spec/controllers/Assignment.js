'use strict';

describe('Controller: AssignmentCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  var AssignmentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssignmentCtrl = $controller('AssignmentCtrl', {
      $scope: scope
    });
  }));

  it('should have a blank test', function () {
  });
});
