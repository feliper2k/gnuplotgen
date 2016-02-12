'use strict';

let tabsPlot = {
    'General': [{
        type: 'custom',
        name: 'plotGeneral'
    }],

    'Appearance': [{
        type: 'custom',
        name: 'plotStyle'
    }],

    'Key position': [{
        type: 'custom',
        name: 'keyPosition'
    }],

    'Key attributes': [{
        type: 'custom',
        name: 'keyAttributes'
    }],

    'More': [{
        type: 'single',
        label: 'Margins',
        action: 'plotAppearanceMargins',
        icon: 'picture_in_picture',
        upright: true
    }]
    /*,
    {
        type: 'menu',
        label: 'Plot Key',
        action: 'plotKey',
        icon: 'vpn_key',
        upright: true,
        menu: [{
            label: 'Toggle',
            action: 'plotKeyToggle',
            icon: 'remove_red_eye'
        }, {
            label: 'Customize...',
            action: 'plotKeyCustomize',
            icon: 'settings'
        }]
    }*/
};

export default tabsPlot;
