'use strict';

function PlotRenderer($http, connectionManager) {
    'ngInject';

    let currentModel, currentStatus;

    function update(model) {
        currentModel = model;
    }

    function render() {
        let request = $http({
            method: 'post',
            url: `${connectionManager.url()}plot`,
            data: currentModel
        });

        request.then(function (success) {
            currentStatus = success.data.status;
        });

        return request;
    }

    function exportEPS() {
        let request = $http({
            method: 'post',
            url: `${connectionManager.url()}eps`,
            data: currentModel
        });

        return request;
    }

    function exportScript() {
        let request = $http({
            method: 'post',
            url: `${connectionManager.url()}script/simple`,
            data: currentModel
        });

        return request;
    }

    function status() {
        return currentStatus;
    }

    const service = {
        update,
        render,
        exportEPS,
        exportScript,
        status
    };

    return service;
}

export default {
    name: 'plotRenderer',
    fn: PlotRenderer
};
