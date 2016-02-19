module.exports = function (model, target) {
    var _ = require('lodash'),
        t = _.template,
        commands = require('./utils').StringBuilder(),
        settings = require('../../settings.js');

    // colors
    // if(model.style.colors === 'mono') {
    //     commands += "set monochrome\n"
    // }

    // quality, i.e. samples and isosamples
    commands.append("set samples <%= samples %>");

    // commands += "plot sin(x)";

    // plotting datasets

    var datasets = model.datasets;

    _.each(datasets, function (ds) {
        var specs;

        switch(ds.type) {
            case '2d':
            specs = t("<%= formula %> title '<%= title %>' with linespoints")({
                formula: ds.data.formulas[0],
                title: ds.label
            });
            break;
            case 'param2d':
            // TODO!
            specs = ds.data.formulas.join(', ');
            break;
            case 'file':
            specs = t("'<%= file %>' using <%= columns %> title '<%= title %>' with linespoints")({
                file: settings.temp.uploadsDir + '/' + ds.data.filename,
                title: ds.label,
                columns: ds.data.columns
            });
            break;
        }

        if(specs) commands.append("plot " + specs);
    });

    return t(commands)(model);
};
