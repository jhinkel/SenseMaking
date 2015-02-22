'use strict';

/**
 * @ngdoc function
 * @name senseMakingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the senseMakingApp
 */
angular.module('senseMakingApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
