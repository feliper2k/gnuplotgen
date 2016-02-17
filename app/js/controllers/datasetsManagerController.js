'use strict';

function gpDatasetsManager($mdDialog, datasetsModel) {
    'ngInject';

    const vm = this;
    this.cancel = $mdDialog.cancel;

    this.datasets = datasetsModel;

    this.addNew = function () {
        $mdDialog.show({
            controller: 'gpDatasetsWizard',
            controllerAs: 'dw',
            templateUrl: 'modals/newDataset.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    };

    return this;
}

export default {
    name: 'gpDatasetsManager',
    fn: gpDatasetsManager
};
