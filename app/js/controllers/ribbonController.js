'use strict';

function gpRibbonController(ribbonActionListener) {
    'ngInject';

    // ViewModel
    const vm = this;

    // tabs
    let tabsHome = require('./ribbon/ribbon-tab-home.js'),
        tabsPlot = require('./ribbon/ribbon-tab-plot.js'),
        tabsAxes = require('./ribbon/ribbon-tab-axes.js'),
        tabsStyles = require('./ribbon/ribbon-tab-styles.js');

        vm.tabs = {
            'Home': tabsHome,
            'Plot': tabsPlot,
            'Axes': tabsAxes,
            'Styles': tabsStyles
        // 'Datasets': tabsDatasets
        // '3D View': tabs3DView
    };

    vm.action = ribbonActionListener;
}

export default {
    name: 'gpRibbonController',
    fn: gpRibbonController
};
