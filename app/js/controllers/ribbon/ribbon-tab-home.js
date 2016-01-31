'use strict';

let tabsHome = {
    'Creation': [{
        label: 'New plot',
        icon: 'note_add',
        type: 'menu',
        menu: [{
            label: '2D Data',
            action: 'newPlot2DData',
            icon: 'insert_chart'
        }, {
            label: '2D Function',
            action: 'newPlot2DFunction',
            icon: 'timeline'
        },
        {
            label: '2D Parametric',
            action: 'newPlot2DParam',
            icon: 'functions'
        },
        {
            label: '3D Data',
            action: 'newPlot3DData',
            icon: 'layers'
        },
        {
            label: '3D Function',
            action: 'newPlot3DFunction',
            icon: '3d_rotation'
        },
        {
            label: 'Contour map',
            action: 'newPlotMap',
            icon: 'map'
        }]
    }, {
        label: 'New dataset',
        icon: 'data_usage',
        type: 'single',
        action: 'newDataset'
    }],

    'Export': [{
        label: 'Export script',
        icon: 'code',
        type: 'menu',
        menu: [{
            label: 'Simple',
            icon: 'code',
            action: 'exportSimple'
        }, {
            label: 'Embedded Data',
            icon: 'attach_file',
            action: 'exportEmbedded'
        }]
    }, {
        label: 'Export EPS',
        icon: 'image',
        type: 'single',
        action: 'exportEPS'
    }]
};

export default tabsHome;
