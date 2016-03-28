'use strict';

function gpDatasetsModel($http, connectionManager, $q) {
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

        if(!removedDataset) {
            removalPromise = $q.reject();
        }
        else if(removedDataset.type === 'file') {
            removalPromise = $http({
                url: `${connectionManager.url()}upload/${removedDataset.data.filename}`,
                method: 'delete'
            }).then((success) => {
                return datasets.splice(index, 1);
            });
        }
        else {
            removalPromise = $q.resolve(datasets.splice(index, 1));
        }

        return removalPromise;
    }

    function clearAll() {
        let arrayOfZeros = _.times(datasets.length, () => 0);

        return $q.all(
            _.map(arrayOfZeros, deleteDataset)
        );
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
