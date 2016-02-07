'use strict';

function gpConnectionModal($mdDialog, connectionManager) {
    'ngInject';

    const vm = this;
    this.cancel = $mdDialog.cancel;

    this.connection = connectionManager;

    return this;
}

export default {
    name: 'gpConnectionModal',
    fn: gpConnectionModal
};
