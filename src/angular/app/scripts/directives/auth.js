'use strict';

angular.module('librecmsApp')
  .directive('auth', function (AuthService, UserService) {

    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var originalDisplay = element.css('display');
        var masks = attrs.auth || AuthService.defaultMask;

        attrs.$observe('auth', function(newAuthAttr) {
          var newMasks = newAuthAttr.replace(/\s+/g, '').split(',');
          masks = newMasks || AuthService.defaultMask;
          updateVisibility();
        });

        function updateVisibility() {
          var role = UserService.getUser().role || AuthService.defaultRole;
          var isAuthorized = AuthService.authorize(role, masks);
          if (isAuthorized) {
            element.css('display', originalDisplay);
          } else {
            element.css('display', 'none');
          }
        }

        scope.$on('UserService.update', updateVisibility);
      }
    };

  });
