'use strict';

function RibbonActionListener($mdDialog) {
    'ngInject';

    let actions = {
        'manageDatasets': (event) => {
            $mdDialog.show({
                controller: 'gpDatasetsManager',
                controllerAs: 'dm',
                templateUrl: 'modals/datasetsManager.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            })
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
