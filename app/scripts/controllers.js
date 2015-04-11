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
        $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        API.getDocNumbers().then(function(response) {
            $scope.test = response[0];
        });

        $scope.changeMonth = function(table) {
            $scope.currentMonth = table;
            console.log(table);
        }
    });
