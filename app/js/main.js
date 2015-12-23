'use strict';

import angular from 'angular';

// angular modules
import 'angular-ui-router';
import 'angular-material';
import 'angular-aria';
import 'angular-animate';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

// create and bootstrap application
const requires = [
  'ui.router',
  'ngMaterial',
  'ngAria',
  'ngAnimate',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', require('./constants'));
angular.module('app').config(require('./on_config'));
angular.module('app').run(require('./on_run'));

angular.bootstrap(document, ['app'], {
  strictDi: true
});
