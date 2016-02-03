var _ = require('lodash');

var renderers = {
    canvas: require('./renderers/canvas.js'),
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
