'use strict';

/**
* @ngdoc function
* @name senseMakingApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the senseMakingApp
*/
angular.module('SenseMakingApp.controllers', [])
    .controller('MainCtrl', function ($scope, $log, API) {
        API.getDocNumbers().then(function(response) {
            $log.info(response);
        });
    });
