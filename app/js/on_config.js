'use strict';

// function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $mdThemingProvider) {
function OnConfig($mdThemingProvider) {
  'ngInject';

  $mdThemingProvider.theme('default')
  .primaryPalette('teal')
  .accentPalette('blue');

  $mdThemingProvider.theme('accent')
  .primaryPalette('brown');
}

export default OnConfig;
