var _ = require('lodash');

var renderers = {
    canvas: require('./renderers/canvas.js'),
    area: require('./renderers/area.js'),
    font: require('./renderers/font.js'),
    axes: require('./renderers/axes.js'),
    plot: require('./renderers/plot.js')
};

module.exports = function (model) {
    function render(target) {
        model.outputType = target;

        return _.reduce(renderers, function (result, r) {
            return [result, r(model), "\n"].join('');
        }, String());
    }

    return {
        render: render
    };
};
