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
            });
        }
    }, true);
}

export default {
    name: 'gpPlotViewController',
    fn: gpPlotViewController
};
