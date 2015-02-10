'use strict';

/**
 * @ngdoc function
 * @name translateApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Common application controller
 */
angular.module('translateApp')
  .controller('AppCtrl', function ($scope, $rootScope, $translate, $interval, VERSION_TAG) {
    $rootScope.VERSION_TAG = VERSION_TAG;// for cache busting

    /**
     * $scope.locale setting
     */
    $scope.locale = $translate.use();
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
      $scope.locale = data.language;
    });

    /**
     * Provides info about current route path
     */
    $rootScope.$on('$routeChangeSuccess', function (event, current) {
      $scope.currentPath = current.$$route.originalPath;
    });

    /**
     * Current time
     */
    $scope.currentTime = Date.now();
    $interval(function () {
      $scope.currentTime = Date.now();
    }, 1000);
  });
