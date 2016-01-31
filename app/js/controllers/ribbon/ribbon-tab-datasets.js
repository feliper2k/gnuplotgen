'use strict';

let tabs = {
    'Manage': [{
        label: 'Manage datasets',
        icon: 'data_usage',
        type: 'single',
        action: 'manageDatasets'
    }],

    'Visibility': [{
        type: 'custom',
        name: 'datasetsVisibility'
    }]
};

export default tabs;
