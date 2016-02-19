'use strict';

function gpMarginsModal($mdDialog, $scope, plotModel) {
    'ngInject';

    var _ = require('lodash');

    const vm = this;
    vm.cancel = $mdDialog.cancel;

    vm.margins = untransformMargins(plotModel.style.margins);

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

    function untransformMargins(m) {
        let uncalculated = {
            left: m.lmargin*100,
            right: (1-m.rmargin)*100,
            top: (1-m.tmargin)*100,
            bottom: m.bmargin*100
        };

        return _.mapValues(uncalculated, (value) => {
            return Math.round(value);
        });
    }

    return this;
}

export default {
    name: 'gpMarginsModal',
    fn: gpMarginsModal
};
