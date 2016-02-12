'use strict';

function gpDatasetsModel() {
    const datasets = [];
    let _ = require('lodash');

    function createDataset(type, label, data) {
        datasets.push({
            type, label, data
        });
    }

    function deleteDataset(index) {
        // TODO: usuwanie danych z dysku za pomocą żądań http, zwracanie promisa
        return datasets.splice(index, 1);
    }

    return {
        'get': (index) => datasets[index],
        'getCollection': () => datasets,
        'getActive': () => _.filter(datasets, (ds) => ds.active),
        'create': createDataset,
        'delete': deleteDataset
    };
}


export default {
    name: 'datasetsModel',
    value: gpDatasetsModel()
};
