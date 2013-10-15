'use strict';

angular.module('librecmsApp')
  .controller('ContentCtrl', function ($state) {
    console.log('hello from ContentCtrl');
    console.log('ContentCtrl state.itemtype = ' + $state.current.data.itemType);
  });
