'use strict';

function PlotArea() {
    'ngInject';

    let _ = require('lodash');

    function calculateMousePosition(event, status) {
        let v = status.variables,
        vars = _.mapValues({
            x: {
                pixelMin: v.GPVAL_TERM_XMIN,
                pixelMax: v.GPVAL_TERM_XMAX,
                pixelRange: v.GPVAL_TERM_XMAX-v.GPVAL_TERM_XMIN,
                dataMin: v.GPVAL_X_MIN,
                dataRange: v.GPVAL_X_MAX-v.GPVAL_X_MIN
            },
            y: {
                pixelMin: v.GPVAL_TERM_YMIN,
                pixelMax: v.GPVAL_TERM_YMAX,
                pixelRange: v.GPVAL_TERM_YMAX-v.GPVAL_TERM_YMIN,
                dataMin: v.GPVAL_Y_MIN,
                dataRange: v.GPVAL_Y_MAX-v.GPVAL_Y_MIN
            }
        }, function (dim) {
            return _.mapValues(dim, window.parseFloat);
        });

        let inBoundsX = event.offsetX > vars.x.pixelMin && event.offsetX < vars.x.pixelMax,
            inBoundsY = event.offsetY > vars.y.pixelMin && event.offsetY < vars.y.pixelMax;

        let position = {
            x: vars.x.dataMin + (event.offsetX-vars.x.pixelMin)/vars.x.pixelRange * vars.x.dataRange,
            y: -vars.y.dataMin - (event.offsetY-vars.y.pixelMin)/vars.y.pixelRange * vars.y.dataRange,
            inBounds: inBoundsX && inBoundsY
        };

        return position;
    }

    return {
        restrict: 'E',
        templateUrl: 'directives/plotarea.html',
        require: 'ngModel',
        link: (scope, element, attrs, model) => {
            let plotData, imageData, status;

            model.$render = () => {
                if(model.$modelValue) {
                    plotData = model.$modelValue;
                    imageData = plotData.image;
                    status = plotData.status;

                    element.find('img').attr('src', imageData);
                }
            };

            let plotElement = element.find('img');
            plotElement.on('mousemove', function (event) {
                scope.mousePosition = calculateMousePosition(event, plotData.status);
                scope.$apply();
            });
        }
    };
}

export default {
    name: 'plotArea',
    fn: PlotArea
};
