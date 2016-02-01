'use strict';

import angular from 'angular';
const bulk = require('bulk-require');

const modelsModule = angular.module('app.models', []);

const models = bulk(__dirname, ['./**/!(*index|*.spec|ribbon-tab*).js']);

Object.keys(models).forEach((key) => {
  let item = models[key];

  modelsModule.value(item.name, item.value);
});

export default modelsModule;
