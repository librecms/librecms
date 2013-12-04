'use strict';

describe('Service: upload', function () {

  // load the service's module
  beforeEach(module('librecmsApp'));

  // instantiate service
  var upload;
  beforeEach(inject(function (_upload_) {
    upload = _upload_;
  }));

  it('should do something', function () {
    expect(!!upload).toBe(true);
  });

});
