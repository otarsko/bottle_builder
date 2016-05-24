'use strict';

angular.module('bottleBuilderApp', ['bottleBuilderApp.constants', 'ngCookies', 'ngResource',
    'ngSanitize', 'ui.router', 'ngjsColorPicker'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
