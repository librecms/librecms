'use strict';

describe('Service: CourseService', function () {

  // load the service's module
  beforeEach(module('librecmsApp'));

  // instantiate service
  var CourseService;
  beforeEach(inject(function (_CourseService_) {
    CourseService = _CourseService_;
  }));

  it('should define CourseService', function () {
    expect(!!CourseService).toBe(true);
  });

  it('should have a valid API', function() {
    expect(typeof(CourseService.getCourse)).toBe('function');
    expect(typeof(CourseService.setCourse)).toBe('function');
    expect(typeof(CourseService.setCourseById)).toBe('function');
  });

});
