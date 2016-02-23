'use strict';

function FitGenerator($http, plotModel, connectionManager, datasetsModel) {
    'ngInject';

    let _ = require('lodash');

    function newFit() {
        let fittingFn = plotModel.options.fit.fittingFn[plotModel.fit.fittingFn],
            dataset = datasetsModel.get(plotModel.fit.selectedDataset),
            columns = dataset.data.columns,
            fittedFile = dataset.data.filename,
            precision = plotModel.options.fit.precision[plotModel.fit.precision];

        let requestData = {
            funTemplate: fittingFn.value,
            variables: fittingFn.variables,
            columns: columns.split(':'),
            options: {
                limit: precision.value
            }
        };

        $http.post(`${connectionManager.url()}fit/${fittedFile}`, requestData)
        .then((success) => {
            let fit = success.data;

            plotModel.fit = _.extend(plotModel.fit, fit);
            let newIndex = datasetsModel.create('2d', `${dataset.label}-fit`, {
                formulas: [fit.fun],
                functionType: '2d'
            });

            plotModel.selectedStyle = newIndex;
            let currentStyle = plotModel.currentStyle;
        }, (failure) => {
            console.log(failure);
        });
    }

    const service = {
        newFit
    };

    return service;
}

export default {
    name: 'fitGenerator',
    fn: FitGenerator
};
