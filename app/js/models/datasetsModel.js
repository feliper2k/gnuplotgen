'use strict';

function gpDatasetsModel($http, connectionManager) {
    'ngInject';

    const datasets = [];
    let _ = require('lodash');

    function createDataset(type, label, data) {
        let visible = true;

        let pushed = datasets.push({
            type, label, data, visible
        });

        return pushed - 1;
    }

    function deleteDataset(index) {
        let removedDataset = datasets[index],
            removalPromise;

        if(removedDataset.type === 'file') {
            removalPromise = $http({
                url: `${connectionManager.url()}upload/${removedDataset.data.filename}`,
                method: 'delete'
            }).then((success) => {
                return datasets.splice(index, 1);
            });
        }

        return removalPromise || datasets.splice(index, 1);
    }

    function clearAll() {
        _.times(datasets.length, function () {
            deleteDataset(0);
        });
    }

    return {
        'get': (index) => datasets[index],
        'getCollection': () => datasets,
        'getActive': () => _.filter(datasets, (ds) => ds.visible),
        'toggle': (n) => {
            datasets[n].visible = !datasets[n].visible;
        },
        'create': createDataset,
        'delete': deleteDataset,
        'clear': clearAll
    };
}


export default {
    name: 'datasetsModel',
    value: gpDatasetsModel
};
