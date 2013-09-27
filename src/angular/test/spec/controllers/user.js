'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  var UserCtrl;
  var scope;
  var httpBackend;
  var createController;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    httpBackend = $httpBackend;

    var fauxUsersList = [
      {
        "name": "faux",
        "createdAt": "2013-09-27T19:58:48.003Z",
        "updatedAt": "2013-09-27T19:58:48.003Z",
        "id": "5245e3785c8d6ddb31000002"
      }
    ];

    // Create a faux HTTP response on HTTP-GET /api/user
    httpBackend.when('GET', '/api/user')
      .respond(fauxUsersList);


    scope = $rootScope.$new();
    createController = function() {
      return $controller('UserCtrl', {
        $scope: scope
      });
    };
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should attach a faux users list to scope', function () {
    httpBackend.expectGET('/api/user');
    var controller = createController();
    httpBackend.flush();
    expect(scope.users).toBeDefined();
    expect(scope.users).not.toBeNull();
  });
});
