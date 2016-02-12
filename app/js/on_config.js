'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $mdThemingProvider) {
  'ngInject';

  // $locationProvider.html5Mode(true);
  //
  // $stateProvider
  // .state('Home', {
  //   url: '/',
  //   controller: 'ExampleCtrl as home',
  //   templateUrl: 'home.html',
  //   title: 'Home'
  // });
  //
  // $urlRouterProvider.otherwise('/');

  $mdThemingProvider.theme('default')
  .primaryPalette('teal')
  .accentPalette('blue');

  $mdThemingProvider.theme('accent')
  .primaryPalette('brown');
}

export default OnConfig;
