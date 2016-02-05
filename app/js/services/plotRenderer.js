'use strict';

function PlotRenderer($http) {
    'ngInject';

    let currentModel, currentStatus;

    function update(model) {
        currentModel = model;
    }

    function render() {
        let request = $http({
            method: 'post',
            url: 'http://localhost:8001/plot',           // TODO: override hardcoded values
            data: currentModel
        });

        request.then(function (success) {
            currentStatus = success.data.status;
        });

        return request;
    }

    function status() {
        return currentStatus;
    }

    const service = {
        update,
        render,
        status
    };

    return service;
}

export default {
    name: 'plotRenderer',
    fn: PlotRenderer
};
