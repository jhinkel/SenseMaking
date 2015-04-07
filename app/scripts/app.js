'use strict';

/**
* @ngdoc overview
* @name senseMakingApp
* @description
* # senseMakingApp
*
* Main module of the application.
*/
angular.module('SenseMakingApp', [
    'ngAnimate',
    'ngRoute',
    'SenseMakingApp.controllers',
    'SenseMakingApp.services'
])
.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
