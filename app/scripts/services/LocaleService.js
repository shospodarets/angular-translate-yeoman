/**
 * @ngdoc function
 * @name translateApp.factory:LocaleService
 * @description
 * # LocaleService
 * Service for setting/getting current locale
 */
angular.module('translateApp')
  .service('LocaleService', function ($translate, LOCALES, $rootScope) {
    'use strict';

    // _LOCALES

    // vars
    var localesObj = LOCALES.locales;

    // get locales and locales display names
    var _LOCALES = Object.keys(localesObj);
    if (!_LOCALES || _LOCALES.length === 0) {
      console.error('There are no _LOCALES provided');
    }
    var _LOCALES_DISPLAY_NAMES = [];
    _LOCALES.forEach(function (locale) {
      _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
    });

    var currentLocale = null;

    // methods
    var checkLocaleIsValid = function (locale) {
      return _LOCALES.indexOf(locale) !== -1;
    };

    $rootScope.$on('$translateChangeSuccess', function (event, data) {
      // set "lang" attribute to html
      document.documentElement.setAttribute('lang', data.language);
    });

    var setLocale = function (locale) {
      if (!checkLocaleIsValid(locale)) {
        console.error('Locale name "' + locale + '" is invalid');
        return;
      }
      currentLocale = locale;
      $translate.use(locale);
    };

    currentLocale = $translate.proposedLanguage();// because of async loading

    return {
      //getLocale: function () {
      //  return currentLocale;
      //},
      getLocaleDisplayName: function () {
        return localesObj[currentLocale];
      },
      //setLocale: function (locale) {
      //  setLocale(locale);
      //},
      setLocaleByDisplayName: function (localeDisplayName) {
        setLocale(
          _LOCALES[
            _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
            ]
        );
      },
//        getLocales: function () {
//            return _LOCALES;
//        },
      getLocalesDisplayNames: function () {
        return _LOCALES_DISPLAY_NAMES;
      }
    };
  });
