'use strict';

function RibbonActionListener($mdDialog, $http, plotRenderer, connectionManager) {
    'ngInject';

    let actions = {
        'newDataset': (event) => {
            $mdDialog.show({
                controller: 'gpDatasetsWizard',
                controllerAs: 'dw',
                templateUrl: 'modals/newDataset.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            })
        },

        'manageDatasets': (event) => {
            $mdDialog.show({
                controller: 'gpDatasetsManager',
                controllerAs: 'dm',
                templateUrl: 'modals/datasetsManager.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            })
        },

        'manageConnection': (event) => {
            $mdDialog.show({
                controller: 'gpConnectionModal',
                controllerAs: 'cm',
                templateUrl: 'modals/connectionManager.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            })
        },

        'plotAppearanceMargins': (event) => {
            $mdDialog.show({
                controller: 'gpMarginsModal',
                controllerAs: 'mm',
                templateUrl: 'modals/margins.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            })
        },

        'exportScriptSimple': (event) => {
            plotRenderer.exportScript().then(function (success) {
                window.location = connectionManager.url() + success.data.path;
            });
        },

        'exportEPS': (event) => {
            plotRenderer.exportEPS().then(function (success) {
                window.location = connectionManager.url() + success.data.path;
            });
        }
    };

    const service = {
        execute: (actionId, event) => {
            return actions[actionId](event);
        }
    };

    return service;
}

export default {
    name: 'ribbonActionListener',
    fn: RibbonActionListener
};
