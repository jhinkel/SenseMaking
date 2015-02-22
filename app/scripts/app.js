'use strict';

/**
* @ngdoc overview
* @name senseMakingApp
* @description
* # senseMakingApp
*
* Main module of the application.
*/
angular
.module('senseMakingApp', [
    'ngAnimate',
    'ngRoute'
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
