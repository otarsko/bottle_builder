'use strict';

angular.module('bottleBuilderApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/:designId',
      template: '<main></main>'
    });
  });
