'use strict';

angular.module('librecmsApp')
  .controller('ContentCtrl', function ($state) {
    console.log('hello from ContentCtrl');
    try {
      console.log('ContentCtrl state.itemtype = ' +
        $state.current.data.itemType);
    } catch(err) {
    }
  });
