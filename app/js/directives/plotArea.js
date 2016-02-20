'use strict';

function PlotArea(plotModel, datasetsModel, $rootScope) {
    'ngInject';

    let _ = require('lodash'),
        Hammer = require('hammerjs'),
        $ = require('jquery');

    function mapVariables(vars) {
        let v = _.mapValues(vars, parseFloat);

        return {
            x: {
                pixelMin: v.GPVAL_TERM_XMIN,
                pixelMax: v.GPVAL_TERM_XMAX,
                pixelRange: v.GPVAL_TERM_XMAX-v.GPVAL_TERM_XMIN,
                dataMin: v.GPVAL_X_MIN,
                dataMax: v.GPVAL_X_MAX,
                dataRange: v.GPVAL_X_MAX-v.GPVAL_X_MIN
            },
            y: {
                pixelMin: v.GPVAL_TERM_YMIN,
                pixelMax: v.GPVAL_TERM_YMAX,
                pixelRange: v.GPVAL_TERM_YMAX-v.GPVAL_TERM_YMIN,
                dataMin: v.GPVAL_Y_MIN,
                dataMax: v.GPVAL_Y_MAX,
                dataRange: v.GPVAL_Y_MAX-v.GPVAL_Y_MIN
            }
        };
    }

    function calculateMousePosition(event, status) {
        let canvas = plotModel.canvas;
        let vars = mapVariables(status.variables);

        // Y axis is inverse (from bottom to top), hence some magic must be done
        let tmpMax = vars.y.pixelMax,
            tmpMin = vars.y.pixelMin;

        vars.y.pixelMin = canvas.height - tmpMax;
        vars.y.pixelMax = canvas.height - tmpMin;

        let inBoundsX = event.offsetX >= vars.x.pixelMin && event.offsetX <= vars.x.pixelMax,
            inBoundsY = event.offsetY >= vars.y.pixelMin && event.offsetY <= vars.y.pixelMax;

        let position = {
            x: vars.x.dataMin + (event.offsetX-vars.x.pixelMin)/vars.x.pixelRange * vars.x.dataRange,
            y: vars.y.dataMin + (event.offsetY-vars.y.pixelMin)/vars.y.pixelRange * vars.y.dataRange,
            inBounds: inBoundsX && inBoundsY
        };

        return position;
    }

    function link(scope, element, attrs, model) {
        let plotData, imageData, status;
        let plotView = element.find('img');

        let dragTool = {
            panstart: (event) => {
                dragTool.savedCoords = mapVariables(status.variables);

                let scrIndicator = $('<canvas></canvas>');
                dragTool.screenIndicator = scrIndicator;

                scrIndicator.attr('width', $(window).width());
                scrIndicator.attr('height', $(window).height());
                scrIndicator.css({
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    pointerEvents: 'none'
                });

                $('body').append(scrIndicator);
            },
            panmove: (event) => {
                let canvas = dragTool.screenIndicator.get(0);
                let ctx = canvas.getContext('2d');
                let pointer = event.pointers[0];

                let origin = {
                    x: pointer.pageX-event.deltaX,
                    y: pointer.pageY-event.deltaY
                };

                let rotation = event.angle*Math.PI/180;

                // ctx.save();
                ctx.setTransform(1,0,0,1,0,0);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.translate(origin.x, origin.y);
                ctx.rotate(rotation);
                ctx.moveTo(0,0);
                ctx.lineTo(event.distance, 0);

                // draw arrowhead
                ctx.lineTo(event.distance - 12, -8);
                ctx.moveTo(event.distance - 12, 8);
                ctx.lineTo(event.distance, 0);

                ctx.stroke();
                ctx.closePath();

                // reset transform and apply rotation
                // ctx.setTransform(1, 1, 0, 0, 0, 0);
                // ctx.restore();
            },
            panend: (event) => {
                let s = dragTool.savedCoords;
                let deltas = {
                    x: event.deltaX/s.x.pixelRange*s.x.dataRange,
                    y: event.deltaY/s.y.pixelRange*s.y.dataRange
                };

                let round = (number, places) => {
                    return parseFloat(number.toFixed(places));
                }

                // console.log(dragTool.savedCoords);
                plotModel.axes.x.min = round(-deltas.x + s.x.dataMin, 3);
                plotModel.axes.x.max = round(-deltas.x + s.x.dataMax, 3);
                plotModel.axes.y.min = round(deltas.y + s.y.dataMin, 3);
                plotModel.axes.y.max = round(deltas.y + s.y.dataMax, 3);
                scope.$apply();

                dragTool.screenIndicator.remove();
            },

            attachEvents: (element, status) => {
                // element.on('dragstart', function (event) {
                //     event.preventDefault();
                // });

                let mc = new Hammer.Manager(element, {
                    recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_ALL }]]
                });

                ['panstart','panmove','panend'].forEach((fn) => {
                    mc.on(fn, dragTool[fn]);
                });
            }
        }

        model.$render = () => {
            if(model.$modelValue) {
                plotData = model.$modelValue;
                imageData = plotData.image;
                status = plotData.status;

                plotView.attr('src', imageData);
                scope.status = status;
            }
        };

        plotView.css({
            pointerEvents: 'none',
            cursor: 'crosshair'
        });

        element.on('mousemove', function (event) {
            scope.mousePosition = calculateMousePosition(event, plotData.status);
            scope.$apply();
        });

        scope.plotModel = plotModel;
        scope.datasetManager = datasetsModel;

        // tools
        dragTool.attachEvents(element[0]);

        // keyboard controls
    }

    return {
        restrict: 'E',
        templateUrl: 'directives/plotarea.html',
        require: 'ngModel',
        scope: true,
        link
    };
}

export default {
    name: 'plotArea',
    fn: PlotArea
};
