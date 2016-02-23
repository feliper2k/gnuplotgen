'use strict';

let tabsHome = {
    'Creation': [{
        label: 'New plot',
        icon: 'note_add',
        type: 'single',
        action: 'newPlot'
    }, {
        label: 'New dataset',
        icon: 'data_usage',
        type: 'single',
        action: 'newDataset'
    }],

    'Data': [{
        label: 'Manage datasets',
        icon: 'data_usage',
        type: 'single',
        action: 'manageDatasets'
    }],

    'Export': [{
        // label: 'Export script',
        // icon: 'code',
        // type: 'menu',
        // menu: [{
        //     label: 'Simple',
        //     icon: 'code',
        //     action: 'exportScriptSimple'
        // }, {
        //     label: 'Embedded Data',
        //     icon: 'attach_file',
        //     action: 'exportScriptEmbedded'
        // }]
        label: 'Export script',
        icon: 'code',
        type: 'single',
        action: 'exportScriptSimple'
    }, {
        label: 'Export EPS',
        icon: 'image',
        type: 'single',
        action: 'exportEPS'
    }],

    'Misc': [{
        label: 'Connection',
        icon: 'settings_input_hdmi',
        type: 'single',
        action: 'manageConnection'
    }, {
        label: 'About',
        icon: 'info_outline',
        type: 'single',
        action: 'about'
    }]
};

export default tabsHome;
