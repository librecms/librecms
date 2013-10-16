'use strict';

describe('Service: UserService', function () {
  beforeEach(module('librecmsApp'));

  var UserService;
  beforeEach(inject(function (_UserService_) {
    UserService = _UserService_;
  }));

  it('should do something', function () {
    expect(!!UserService).toBe(true);
  });

});
