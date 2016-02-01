'use strict';

function gpRibbonController(ribbonActionListener) {
    'ngInject';

    // ViewModel
    const vm = this;

    // tabs
    let tabsHome = require('./ribbon/ribbon-tab-home.js'),
        tabsPlot = require('./ribbon/ribbon-tab-plot.js'),
        tabsAxes = require('./ribbon/ribbon-tab-axes.js'),
        tabsDatasets = require('./ribbon/ribbon-tab-datasets.js');

    vm.tabs = {
        'Home': tabsHome,
        'Plot': tabsPlot,
        'Axes': tabsAxes,
        'Datasets': tabsDatasets
        // '3D View': tabs3DView
    };

    vm.action = ribbonActionListener;
}

export default {
    name: 'gpRibbonController',
    fn: gpRibbonController
};
