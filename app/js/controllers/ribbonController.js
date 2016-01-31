'use strict';

function gpRibbonController() {
    // ViewModel
    const vm = this;

    // tabs
    let tabsHome = require('./ribbon/ribbon-tab-home.js'),
        tabsPlot = require('./ribbon/ribbon-tab-plot.js');

    vm.tabs = {
        'Home': tabsHome,
        'Plot': tabsPlot/*,
        'Axes': tabsAxes,
        'Datasets': tabsDatasets,
        '3D View': tabs3DView*/
    };
}

export default {
    name: 'gpRibbonController',
    fn: gpRibbonController
};
