'use strict';

/**
 * @ngdoc overview
 * @name innovationApp
 * @description
 * # innovationApp
 *
 * Main module of the application.
 */
angular
  .module('innovationApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/jobs', {
        templateUrl: 'views/jobs.html',
        controller: 'JobsCtrl',
        controllerAs: 'jobs'
      })
      .when('/comparisons', {
        templateUrl: 'views/comparisons.html',
        controller: 'ComparisonsCtrl',
        controllerAs: 'comparisons'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
