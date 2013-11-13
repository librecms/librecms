'use strict';

describe('Directive: auth', function () {

  // load the directive's module
  beforeEach(module('librecmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<auth></auth>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the auth directive');
  }));
});
