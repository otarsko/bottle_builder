'use strict';

angular.module('bottleBuilderApp', ['bottleBuilderApp.constants', 'ngCookies', 'ngResource',
    'ngSanitize', 'ui.router', 'colorpicker-dr'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
