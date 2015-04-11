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

        $scope.setCurrentMonth = function(month) {
            $scope.currentMonth = month;

            API.getDocNumbers().then(function(response) {
                $scope.keywords = response;
                console.log(response);
                console.log(typeof(response));
            });
        };
    });
