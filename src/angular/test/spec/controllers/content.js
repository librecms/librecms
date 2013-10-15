'use strict';

describe('Controller: ContentCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  var ContentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $state) {
    scope = $rootScope.$new();
    ContentCtrl = $controller('ContentCtrl', {
      $scope: scope
    });
  }));

  it('should should have an empty test', function () {
  });
});
