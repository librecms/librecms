'use strict';

angular.module('librecmsApp')
  .service('AuthService', function Authservice() {
    // https://github.com/librecms/librecms/wiki/Authentication#user-roles 
    // for an explanation of userRoles and userMasks
    // User Role and Role Mask definitions.
    var roleMasks = {
      nobody: 0,
      public: 15,
      student: 2,
      instructor: 4,
      admin: 8
    };

    var userRoles = {
      public: 1,
      student: 3,
      instructor: 5,
      admin: 9
    };


    // Authentication methods
    // @param role is user's role
    // @param masks is an array of (or single) user mask
    function _authenticate(role, masks) {
      masks = Array.isArray(masks) ? masks : [masks];
      return masks.some(function(mask) {
        return role & mask;
      });
    }

    // Translate role and mask strings into role/mask Numbers
    function authenticate(sRole, sMasks) {
      sMasks = Array.isArray(sMasks) ? sMasks : [sMasks];
      // Translate string masks into Numerical masks
      var masks = sMasks.map(function(sMask) {
        // Default to 'nobody' if can't find role mask
        return roleMasks.hasOwnProperty(sMask) ?
          roleMasks[sMask] : roleMasks.nobody;
      });
      // Translate string role into Numberical role
      // Defaulting to public
      var role = userRoles.hasOwnProperty(sRole) ?
        userRoles[sRole] : userRoles.public;

      // Authenticate based on translated role / masks
      return _authenticate(role, masks);
    }

    return {
      roles: userRoles,
      masks: roleMasks,
      authenticate: authenticate,
      _authenticate: _authenticate
    };
  });
