'use strict';

// tabs
//    let tabsHome = require('./ribbon/ribbon-tab-home.js'),
//        tabsPlot = require('./ribbon/ribbon-tab-plot.js'),
//        tabsAxes = require('./ribbon/ribbon-tab-axes.js'),
//        tabsStyles = require('./ribbon/ribbon-tab-styles.js'),
//        tabsFitting = require('./ribbon/ribbon-tab-fitting.js');

import tabsHome from './ribbon/ribbon-tab-home';
import tabsPlot from './ribbon/ribbon-tab-plot';
import tabsAxes from './ribbon/ribbon-tab-axes';
import tabsStyles from './ribbon/ribbon-tab-styles';
import tabsFitting from './ribbon/ribbon-tab-fitting';

function gpRibbonController(ribbonActionListener, datasetsModel) {
    'ngInject';

    // ViewModel
    const vm = this;



        vm.tabs = {
            'Home': tabsHome,
            'Plot': tabsPlot,
            'Axes': tabsAxes,
            'Styles': tabsStyles,
            'Fitting': tabsFitting
    };

    vm.action = ribbonActionListener;
    vm.noDatasetsDefined = function () {
        return datasetsModel.getCollection().length === 0;
    };
}

export default {
    name: 'gpRibbonController',
    fn: gpRibbonController
};
