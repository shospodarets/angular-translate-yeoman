'use strict';

/**
 * @ngdoc function
 * @name translateApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Common application controller
 */
angular.module('translateApp')
  .controller('AppCtrl', function ($scope, $rootScope, $translate) {
    /**
     * $scope.locale setting
     */
    $scope.locale = $translate.use();
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
      $scope.locale = data.language;
    });

    /**
     * Stop application loading animation when translations are loaded
     */
    var offStopAnimation;
    var stopLoadingAnimation = function () {
      angular.element('#app-loading-wrapper').remove();
      angular.element('.app-loading-hidden').removeClass('app-loading-hidden');
    };
    var applyStopAnimationOnce = function () {
      stopLoadingAnimation();
      offStopAnimation();
    };

    if ($translate.proposedLanguage()) {
      // translations aren't loaded
      // explanation how to unsubscribe ($off) - http://stackoverflow.com/a/14898795/1120798
      offStopAnimation = $rootScope.$on('$translateChangeSuccess', applyStopAnimationOnce);
    } else {
      // translations aren already loaded
      stopLoadingAnimation();
    }

    /**
     * Provides info about current route path
     */
    $rootScope.$on('$routeChangeSuccess', function (event, current) {
      $scope.currentPath = current.$$route.originalPath;
    });
  });
