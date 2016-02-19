'use strict';

function gpDatasetsModel($http, connectionManager) {
    'ngInject';

    const datasets = [];
    let _ = require('lodash');

    function createDataset(type, label, data) {
        datasets.push({
            type, label, data
        });
    }

    function deleteDataset(index) {
        let removedDataset = datasets[index];
        let removalPromise = $http({
            url: `${connectionManager.url()}upload/${removedDataset.data.filename}`,
            method: 'delete'
        });

        removalPromise.finally(function () {
            datasets.splice(index, 1);
        });

        return removalPromise;
    }

    return {
        'get': (index) => datasets[index],
        'getCollection': () => datasets,
        'getActive': () => _.filter(datasets, (ds) => !ds.disabled),
        'toggle': (n) => {
            datasets[n].disabled = !datasets[n].disabled;
        },
        'create': createDataset,
        'delete': deleteDataset
    };
}


export default {
    name: 'datasetsModel',
    value: gpDatasetsModel
};
