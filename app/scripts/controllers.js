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
        var promise = API.getDocNumbers();
        promise.then(
            function (payload) {
                $scope.docNumbers = payload;
            },
            function (errorPayload) {
                $log.error('failure loading documents', errorPayload);
            }
        );
    });
