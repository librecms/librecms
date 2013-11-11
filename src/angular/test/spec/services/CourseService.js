'use strict';

describe('Service: CourseService', function () {

  // load the service's module
  beforeEach(module('librecmsApp'));

  // instantiate service
  beforeEach(inject(function () {
  }));

  it('should define CourseService', inject(function (CourseService) {
    expect(!!CourseService).toBe(true);
  }));

  it('should have a valid API', inject(function(CourseService) {
    expect(typeof(CourseService.getCourse)).toBe('function');
    expect(typeof(CourseService.setCourse)).toBe('function');
    expect(typeof(CourseService.setCourseById)).toBe('function');
    expect(typeof(CourseService.getPosts)).toBe('function');
    expect(typeof(CourseService.createPost)).toBe('function');
  }));
});
