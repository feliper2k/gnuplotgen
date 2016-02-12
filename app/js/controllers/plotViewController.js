'use strict';

function gpPlotViewController($scope, $mdToast, plotModel, plotRenderer) {
    'ngInject';

    // ViewModel
    const vm = this;
    vm.autoUpdate = true;
    vm.renderingDone = false;

    vm.render = () => {
        vm.renderingDone = false;

        let model = plotModel;

        plotRenderer.update(model);
        plotRenderer.render().then(function (success) {
            vm.plotData = success.data;
            vm.renderingError = null;
        }, function (err) {
            let errorMessage;

            switch(err.status) {
                case 400:        // Bad Request
                errorMessage = err.data.error;
                break;
                case -1:        // server unreachable
                errorMessage = `Server at ${err.config.url} is unreachable. Please check your connection settings.`
                break;
            }

            $mdToast.show($mdToast.simple()
                .theme('accent')
                .content(errorMessage)
            );

            vm.renderingError = err.data.error;
        }).finally(function () {
            // initial loading
            $scope.main.loaderDeferred.resolve();
            vm.renderingDone = true;
        });
    }

    // watch plotModel for mutations
    $scope.$watch(function () {
        return plotModel;
    }, function () {
        if (vm.autoUpdate) {
            vm.render();
        }
    }, true);
}

export default {
    name: 'gpPlotViewController',
    fn: gpPlotViewController
};
