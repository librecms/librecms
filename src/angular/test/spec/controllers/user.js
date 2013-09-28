'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  var UserCtrl;
  var scope;
  var rootScope;
  var httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    httpBackend = $httpBackend;
    rootScope = $rootScope;

    var fauxUsersList = [
      {
        "name": "faux",
        "createdAt": "2013-09-27T19:58:48.003Z",
        "updatedAt": "2013-09-27T19:58:48.003Z",
        "id": "5245e3785c8d6ddb31000002"
      }
    ];

    // Create a faux HTTP response on HTTP-GET /api/user
    httpBackend.when('GET', '/api/user').respond(fauxUsersList);

    scope = $rootScope.$new();
    $controller('UserCtrl', { $scope: scope });
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should attach a faux users list to scope', function () {
    httpBackend.flush();
    expect(scope.users).toBeDefined();
    expect(scope.users).not.toBeNull();

    // @TODO zdwolfe: 
    // I couldn't figure out how to force 
    // karma to flush scope and resolve the Restangular
    // promise. I opened an issue with Restangular here:
    // https://github.com/mgonto/restangular/issues/324

    expect(scope.users[0].name).toBe('faux');
  });
});
