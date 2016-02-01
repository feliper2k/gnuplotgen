'use strict';

function gpPlotModel() {
    // ViewModel
    const vm = this;
    let angular = require('angular'),
        plot;

    let initPlot = {
        title: "",

        canvas: {
            height: 400, width: 600
        },

        style: {
            fontsAvailable: {
                'Sans-serif': 'sans',
                'Serif': 'serif'
            },
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
        }
    };

    initPlot.reset();
    return plot;
}


export default {
    name: 'plotModel',
    value: gpPlotModel()
};
