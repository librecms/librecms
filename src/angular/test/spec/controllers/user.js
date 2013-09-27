'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('librecmsApp'));

  var UserCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {

    var fauxUsersList = [
      {
        "name": "faux",
        "createdAt": "2013-09-27T19:58:48.003Z",
        "updatedAt": "2013-09-27T19:58:48.003Z",
        "id": "5245e3785c8d6ddb31000002"
      }
    ];

    // Create a faux HTTP response on HTTP-GET /api/user
    $httpBackend.when('GET', '/api/user')
    .respond(fauxUsersList);


    scope = $rootScope.$new();
    UserCtrl = $controller('UserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a faux users list to scope', function () {
    expect(scope.users.length).not.to.equal(0);
  });
});
