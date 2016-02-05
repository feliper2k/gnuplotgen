'use strict';

function gpPlotViewController($scope, plotModel, plotRenderer) {
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
                vm.imageData = success.data.image;
            }, function (err) {
                console.log(err);
            });
        }
    }, true);
}

export default {
    name: 'gpPlotViewController',
    fn: gpPlotViewController
};
