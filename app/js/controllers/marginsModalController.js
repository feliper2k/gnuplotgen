'use strict';

function gpMarginsModal($mdDialog, $scope, plotModel) {
    'ngInject';

    var _ = require('lodash');

    const vm = this;
    vm.cancel = $mdDialog.cancel;

    vm.margins = {};

    $scope.$watch(function () {
        return vm.margins;
    }, function () {
        plotModel.style.margins = transformMargins(vm.margins);
    }, true);

    function transformMargins(m) {
        let calculated = {
            lmargin: m.left/100,
            rmargin: 1-m.right/100,
            tmargin: 1-m.top/100,
            bmargin: m.bottom/100
        };

        return calculated;
    }

    return this;
}

export default {
    name: 'gpMarginsModal',
    fn: gpMarginsModal
};
