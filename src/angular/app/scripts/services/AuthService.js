'use strict';

angular.module('librecmsApp')
  .service('AuthService',
    function Authservice(Restangular, UserService, $log, $state) {
    // https://github.com/librecms/librecms/wiki/Authentication#user-roles 
    // for an explanation of userRoles and userMasks
    // User Role and Role Mask definitions.
    var roleMasks = {
      nobody: 0,
      'public': 1,
      student: 2,
      instructor: 4,
      admin: 8,
      everybody: 15
    };

    var userRoles = {
      public: 1,
      student: 2,
      instructor: 4,
      admin: 8
    };

    // What constitutes a user being 'logged in'?
    var loggedInRoles = [
      userRoles.student, userRoles.instructor, userRoles.admin
    ];

    // Authorization methods
    // @param role is user's role
    // @param masks is an array of (or single) user mask
    function _authorize(role, masks) {
      masks = Array.isArray(masks) ? masks : [masks];
      var isAuthorized = masks.some(function(mask) {
        return role & mask;
      });
      return isAuthorized;
    }

    // Translate role and mask strings into role/mask Numbers
    // @pram sRole a string representation of their role ('student'), etc.
    // @param sMashs an array of string representations of masks
    // Default mask to 'nobody' and role to 'public'
    // Finally run _authorize based Nuerical role / masks
    function authorize(sRole, sMasks) {
      sMasks = Array.isArray(sMasks) ? sMasks : [sMasks];
      var masks = sMasks.map(function(sMask) {
        return roleMasks.hasOwnProperty(sMask) ?
          roleMasks[sMask] : roleMasks.nobody;
      });

      var role = userRoles.hasOwnProperty(sRole) ?
        userRoles[sRole] : userRoles['public'];

      return _authorize(role, masks);
    }

    function login(parameters) {
      Restangular.all('auth').all('login').post(parameters)
        .then(function(user) {
          UserService.setUser(user);
          $state.go('main.user.home');
        }, function() {
          $log.error('error logging in');
        });
    }

    function logout() {
      Restangular.all('auth').all('logout').post()
        .then(function() {
          UserService.clearUser();
          $state.go('splash');
        });
    }

    function isLoggedIn() {
      var user = UserService.getUser();
      if (!user) return false;
      if (!user.role) return false;
      return (loggedInRoles.indexOf(user.role) > -1);
    }

    return {
      roles: userRoles,
      masks: roleMasks,
      defaultMask: ['student', 'instructor'],
      defaultRole: 'public',
      defaultAuthRedirect: 'login',
      authorize: authorize,
      _authorize: _authorize,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn
    };
  });
