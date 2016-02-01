'use strict';

function gpDatasetsManager($mdDialog, datasetsModel) {
    'ngInject';

    const vm = this;
    this.cancel = $mdDialog.cancel;

    this.datasets = datasetsModel;

    return this;
}

export default {
    name: 'gpDatasetsManager',
    fn: gpDatasetsManager
};
