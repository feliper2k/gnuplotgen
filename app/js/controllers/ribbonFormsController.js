'use strict';

function gpRibbonFormsController(plotModel) {
    'ngInject';

    const vm = this;
    vm.plot = plotModel;
}

export default {
    name: 'gpRibbonFormsController',
    fn: gpRibbonFormsController
};
