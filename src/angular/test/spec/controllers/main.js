'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  // load controller widgets/views/partials
  var views = [
    'views/main.html'
  ];

  views.forEach(function(view) {
    beforeEach(module(view));
  });


  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have a blank test', function () {
  });
});
