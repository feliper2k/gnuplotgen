'use strict';

function gpRibbonModel() {
    // ViewModel
    const vm = this;

    vm.plot = {
        title: "",
        canvas: {
            height: 0, width: 0
        },
        style: {
            fontsAvailable: {
                'Sans-serif': 'sans',
                'Serif': 'serif'
            },
            fontFace: 'sans',
            fontSize: 12
        }
    };
}

export default {
    name: 'gpRibbonModel',
    fn: gpRibbonModel
};
