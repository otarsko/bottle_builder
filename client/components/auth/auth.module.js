'use strict';

angular.module('bottleBuilderApp.auth', ['bottleBuilderApp.constants',
    'bottleBuilderApp.util', 'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
