'use strict';

describe('Service: CourseService', function () {

  // load the service's module
  beforeEach(module('librecmsApp'));

  // instantiate service
  var CourseService;
  beforeEach(inject(function (_CourseService_) {
    CourseService = _CourseService_;
  }));

  it('should do something', function () {
    expect(!!CourseService).toBe(true);
  });

});
