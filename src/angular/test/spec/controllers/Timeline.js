'use strict';

describe('Controller: TimelineCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  var TimelineCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TimelineCtrl = $controller('TimelineCtrl', {
      $scope: scope
    });
  }));

  it('should have a blank test', function () {
  });
});
