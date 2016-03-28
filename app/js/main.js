'use strict';

import angular from 'angular';
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';

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
import './models';


// create and bootstrap application
const requires = [
  'ngMaterial',
  'ngAria',
  'ngAnimate',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.models',
  'app.directives'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);
angular.module('app').config(onConfig);
angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
