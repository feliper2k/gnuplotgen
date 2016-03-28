//'use strict';
//
//import angular from 'angular';
//const bulk = require('bulk-require');
//
//const modelsModule = angular.module('app.models', []);
//
//const models = bulk(__dirname, ['./**/!(*index|*.spec|_*).js']);
//
//Object.keys(models).forEach((key) => {
//  let item = models[key];
//
//  modelsModule.factory(item.name, item.value);
//});
//
//export default modelsModule;

import angular from 'angular';

const bulk = require('bulk-require');
const modelsModule = angular.module('app.models', []);
const models = bulk(__dirname, ['./**/!(*index|*.spec|_*).js']);

function declare(modelMap) {
  Object.keys(modelMap).forEach((key) => {
    let item = modelMap[key];

    if (!item) {
      return;
    }

    if (item.value && typeof item.value === 'function') {
      modelsModule.factory(item.name, item.value);
    } else {
      declare(item);
    }
  });
}

declare(models);

export default modelsModule;
