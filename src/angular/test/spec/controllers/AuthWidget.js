'use strict';

describe('Controller: AuthWidgetCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  var AuthwidgetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthwidgetCtrl = $controller('AuthWidgetCtrl', {
      $scope: scope
    });
  }));

  it('should attach a login function', function () {
    expect(typeof(scope.login)).toBe('function');
  });
});
