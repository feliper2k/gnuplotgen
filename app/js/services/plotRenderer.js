'use strict';

function PlotRenderer($http) {
    'ngInject';

    let currentModel;

    function update(model) {
        currentModel = model;
    }

    function render() {
        return $http({
            method: 'post',
            url: 'http://localhost:8001/plot',           // TODO: override hardcoded values
            data: currentModel
        });
    }

    const service = {
        update,
        render
    };

    return service;
}

export default {
    name: 'plotRenderer',
    fn: PlotRenderer
};
