'use strict';

function gpDatasetsModel() {


    const datasets = [];

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
        'create': createDataset,
        'delete': deleteDataset
    };
}


export default {
    name: 'datasetsModel',
    value: gpDatasetsModel()
};
