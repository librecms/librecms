'use strict';

angular.module('librecmsApp')
  .factory('UserService', function ($rootScope) {
    // Service logic, declarations, etc.
    // ...
    var user = {
      firstName: 'Zachary',
      lastName: 'Wolfe',
      id: '91405',
      fullname: function() {
        return this.firstName + ' ' + this.lastName;
      },
      courses: [
        {
          name: 'CMPSC483w',
          id: '483'
        },
        {
          name: 'MATH485',
          id: '485'
        },
        {
          name: 'MATH230',
          id: '230'
        },
        {
          name: 'CMPEN362',
          id: 362
        }
      ]
    };

    // Public API here
    return {
      user: user,
      updateUser: function(newUser) {
        console.log('updateUser newUser = ' + JSON.stringify(newUser));
        user = newUser;
        $rootScope.$broadcast('UserService.updateUser', user);
      }
    };
  });
