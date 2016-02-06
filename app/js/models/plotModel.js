'use strict';

function gpPlotModel() {
    let angular = require('angular'),
        plot;

    let options = {
        fontFace: ['serif', 'sans', 'Arial', 'Times', 'Georgia', 'Helvetica'],
        lineStyle: '',
        fontSize: [6, 8, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 48, 64, 72]
    };

    let initPlot = {
        title: "",

        canvas: {
            height: 400, width: 600
        },

        style: {
            fontFace: 'sans',
            fontSize: 12,

            lineStylesAvailable: [{
                label: 'Subtle',
                id: 'subtle',
                value: 'something'
            }],
            lineStyle: 'subtle',

            key: {
                enable: true
            }
        },

        axes: {
            active: 'x',
            x: {},
            y: {},
            z: {}
        },

        samples: 100,

        reset: () => {
            plot = initPlot;
        },

        plotStyles: [{
            name: 'Style 1',
            plotWith: 'lines',
            lineColor: '#990000',
            lineWidth: 2,
            dashType: 0,
            pointType: 0
        }],
        plotStyleActive: 0,

        options: options
    };

    initPlot.reset();
    return plot;
}


export default {
    name: 'plotModel',
    value: gpPlotModel()
};
