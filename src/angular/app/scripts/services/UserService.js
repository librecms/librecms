'use strict';

angular.module('librecmsApp')
  .factory('UserService', function ($rootScope, Restangular) {
    // Service logic, declarations, etc.
    // ...
    var Users = Restangular.all('users');
    var user = { };

    function setUser(newUser) {
      user = newUser;
      $rootScope.$broadcast('UserService.update');
    }

    function getUser() {
      return user;
    }

    function setUserById(userId) {
      Users.get(userId).then(function(newUser) {
        newUser.getList('courses').then(function(courses) {
          newUser.courses = courses;
          setUser(newUser);
        });
      });
    }

    // If using local database, use this:
    //setUserById('527561723e4889199063e34b');

    // If using remote database, use this:
    setUserById('527840d3123657810a000007');

    // Public API here
    return {
      getUser: getUser,
      setUser: setUser
    };
  });
