'use strict';

angular.module('bottleBuilderApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      template: '<main></main>'
    });

    //todo: state for link with bottle id
  });
