'use strict';

/**
 * @ngdoc function
 * @name translateApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the translateApp
 */
angular.module('translateApp')
  .controller('AboutCtrl', function ($scope) {
    // Yeoman part (for tests)
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
