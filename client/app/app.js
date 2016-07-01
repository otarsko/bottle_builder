'use strict';

angular.module('bottleBuilderApp', ['bottleBuilderApp.constants',
    'bottleBuilderApp.auth', 'bottleBuilderApp.admin',
    'ngCookies', 'ngResource',
    'ngSanitize', 'ui.router', 'colorpicker-dr'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
