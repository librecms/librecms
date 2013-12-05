'use strict';

angular.module('librecmsApp')
  .factory('UserService',
    function ($rootScope, Restangular, $cookieStore) {
    var clearedUser = {
      role: 'public',
      initialized: false
    };

    function setUser(newUser) {
      user = newUser;
      $rootScope.$broadcast('UserService.update');
    }

    function getUser() {
      return user || clearedUser;
    }

    function getRole() {
      return user.role ? user.role : clearedUser.role;
    }

    function setUserById(userId) {
      Users.get(userId).then(function(newUser) {
        setUser(newUser);
      });
    }

    function clearUser() {
      $cookieStore.remove('user');
      setUser(clearedUser);
    }

    // Restangular collection
    var Users = Restangular.all('users');

    // Get user from cookie or fall back to 'unknown' user
    var user = $cookieStore.get('user');
    if (user) {
      Users.get(user._id).then(function(newUser) {
        user = newUser;
      });
    } else {
      user = clearedUser;
    }

    // Public API here
    return {
      getUser: getUser,
      getRole: getRole,
      setUser: setUser,
      setUserById: setUserById,
      clearUser: clearUser
    };
  });
