'use strict';

function gpPlotModel(datasetsModel) {
    'ngInject';

    let angular = require('angular'),
        plot;

    let _ = require('lodash');

    let options = require('./_plotOptions.js');

    let initPlot = {
        title: "",

        canvas: {
            height: 400, width: 600
        },

        style: {
            fontFace: 'sans',
            fontSize: '12',

            key: {
                enable: true,
                position: '',
                title: ''
            },

            colors: 'full',

            margins: {
                tmargin: 0.9,
                lmargin: 0.15,
                rmargin: 0.9,
                bmargin: 0.15
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

        get datasetsAll() {
            return datasetsModel.getCollection();
        },

        // datasets: [],

        selectedStyle: 0,
        lineStyles: [{
            plotWith: options.lineStyle.plotWith[0].value,
            lineColor: options.lineStyle.randomLineColor(),
            lineWidth: 2,
            pointType: 0,
            pointSize: 1,
            pointInterval: 1
        }],

        get currentStyle() {
            // return current style - if not available,
            // create one with another color
            let tentativeStyle = this.lineStyles[this.selectedStyle];

            if(!tentativeStyle) {
                let styleCopy = _.clone(this.lineStyles[0]);

                styleCopy.lineColor = options.lineStyle.randomLineColor();
                this.lineStyles[this.selectedStyle] = styleCopy;
            }

            return tentativeStyle;
        },

        gridStyle: {
            majorWidth: 1,
            minorWidth: 0.5,
            lineColor: options.lineStyle.lineColor[0].value,
            showMajor: false,
            showMinor: true
        },

        options: options
    };

    initPlot.reset();
    return plot;
}


export default {
    name: 'plotModel',
    value: gpPlotModel
};
