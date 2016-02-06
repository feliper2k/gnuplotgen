'use strict';

function gpPlotViewController($scope, $mdToast, plotModel, plotRenderer) {
    'ngInject';

    // ViewModel
    const vm = this;
    vm.autoUpdate = true;

    // watch plotModel for mutations
    $scope.$watch(function () {
        return plotModel;
    }, function (model) {
        if (vm.autoUpdate) {
            // console.log('model updated');
            plotRenderer.update(model);
            plotRenderer.render().then(function (success) {
                vm.plotData = success.data;
            }, function (err) {
                var errorMessage = err.data.error;

                // toast error message
                $mdToast.show($mdToast.simple()
                    .theme('accent')
                    .content(errorMessage)
                );
            });
        }
    }, true);
}

export default {
    name: 'gpPlotViewController',
    fn: gpPlotViewController
};
