'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a title to the scope to test that this Controller is initialized', function () {
    expect(scope.title).toBe('librecms');
  });
});
