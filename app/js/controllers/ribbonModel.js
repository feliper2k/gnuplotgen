'use strict';

function gpRibbonModel() {
    // ViewModel
    const vm = this;

    vm.plot = {
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

        samples: 100
    };
}

export default {
    name: 'gpRibbonModel',
    fn: gpRibbonModel
};
