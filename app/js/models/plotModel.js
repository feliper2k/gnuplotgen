'use strict';

function gpPlotModel(datasetsModel) {
    'ngInject';

    let angular = require('angular'),
        plot;

    let options = {
        fontFace: ['serif', 'sans', 'Arial', 'Times', 'Georgia', 'Helvetica'],
        lineStyle: '',
        fontSize: ['6', '8', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '72'],
        colors: [{
            id: 'full', label: 'Full color'
        }, {
            id: 'mono', label: 'Monochrome'
        }]
    };

    let initPlot = {
        title: "",

        canvas: {
            height: 400, width: 600
        },

        style: {
            fontFace: 'sans',
            fontSize: '12',

            lineStylesAvailable: [{
                label: 'Subtle',
                id: 'subtle',
                value: 'something'
            }],
            lineStyle: 'subtle',

            key: {
                enable: true,
                position: '',
                title: ''
            },

            colors: 'full',

            margins: {
                tmargin: 0.9,
                lmargin: 0.1,
                rmargin: 0.9,
                bmargin: 0.1
            },

            tics: {
                position: 'border',
                mirror: true
            }
        },

        axes: {
            active: 'x',
            x: {
                min: -5,
                max: 5,

                ticsPosition: 'border',
                ticsMirroring: true,

                majorTics: {
                    enable: true,
                    frequency: 1,
                    scale: 1
                },
                minorTics: {
                    enable: false,
                    frequency: 2,
                    scale: 0.5
                },
                style: {
                    fontFace: null,
                    fontSize: null
                }
            },
            y: {
                min: -5,
                max: 5,

                ticsPosition: 'border',
                ticsMirroring: true,

                majorTics: {
                    enable: true,
                    frequency: 1,
                    scale: 1
                },
                minorTics: {
                    enable: false,
                    frequency: 2,
                    scale: 0.5
                },
                style: {
                    fontFace: null,
                    fontSize: null
                }
            },

            get activeAxis() {
                return this[this.active];
            }
        },

        samples: 100,

        reset: () => {
            plot = initPlot;

            // datasetsModel.each(delete);
        },

        get datasets() {
            return datasetsModel.getActive();
        },
        // datasets: [],

        plotStyles: [{
            plotWith: 'lines',
            lineColor: '#990000',
            lineWidth: 2,
            dashType: 0,
            pointType: 0,
            pointSize: 1
        }],

        options: options
    };

    initPlot.reset();
    return plot;
}


export default {
    name: 'plotModel',
    value: gpPlotModel
};
