module.exports = function (model, target) {
    var t = require('lodash').template,
        commands = '';

    // colors
    // if(model.style.colors === 'mono') {
    //     commands += "set monochrome\n"
    // }

    // quality, i.e. samples and isosamples
    commands += "set samples <%= samples %>" + "\n";

    // TODO: isosamples

    commands += "plot sin(x)";


    return t(commands)(model);
};
