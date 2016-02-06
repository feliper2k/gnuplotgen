module.exports = function (model, target) {
    var t = require('lodash').template,
        commands = '';

    // quality, i.e. samples and isosamples
    commands += "set samples <%= samples %>" + "\n";

    // TODO: isosamples

    commands += "plot sin(x)";


    return t(commands)(model);
};
