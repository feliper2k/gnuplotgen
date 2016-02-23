'use strict';

let tabsFitting = {
    'Select dataset': [{
        type: 'custom',
        name: 'fitSelectData'
    }],

    'Fit options': [{
        type: 'custom',
        name: 'fitOptions'
    },
    {
        type: 'single',
        label: 'Generate',
        action: 'fitGenerate',
        icon: 'timeline',
        upright: true
    }],

    'Fit log': [{
        type: 'custom',
        name: 'fitLogging'
    }]
};

export default tabsFitting;
