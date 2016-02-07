'use strict';

function mainController($q) {
    'ngInject';

    const vm = this;
    let deferred = $q.defer();

    deferred.promise.then(function resolved() {
        vm.loaded = true;
    });

    vm.loaderDeferred = deferred;
}

export default {
    name: 'mainController',
    fn: mainController
};
