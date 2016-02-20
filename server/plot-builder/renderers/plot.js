module.exports = function (model, target) {
    var _ = require('lodash'),
        t = _.template,
        commands = require('./utils').StringBuilder(),
        settings = require('../../settings.js');

    commands.append("set samples <%= samples %>");

    // plotting datasets
    var datasets = model.datasets;
    var plots = [];

    _.each(datasets, function (ds, index) {
        var specs;

        switch(ds.type) {
            case '2d':
            specs = t("<%= formula %> title '<%= title %>'")({
                formula: ds.data.formulas[0],
                title: ds.label
            });
            break;
            case 'param2d':
            specs = ds.data.formulas.join(',');
            break;
            case 'file':
            specs = t("'<%= file %>' using <%= columns %> title '<%= title %>'")({
                file: settings.temp.uploadsDir + '/' + ds.data.filename,
                title: ds.label,
                columns: ds.data.columns
            });
            break;
        }

        // line styles
        var styleModel = model.lineStyles[index];
        var valueMapping = {
            'plotWith': 'w',
            'lineColor': 'lc',
            'lineWidth': 'lw',
            'pointType': 'pt',
            'pointSize': 'ps',
            'pointInterval': 'pi'
        };

        if(styleModel) {
            specs += " " + _(styleModel).mapKeys(function (value, key) {
                return valueMapping[key];
            }).reduce(function (result, value, key) {
                if(key === 'lc') {
                    // special treatment for line colors
                    value = "rgb '" + value + "'";
                }

                result.push([key, value].join(" "));
                return result;
            }, []).join(" ");
        }

        if(specs) plots.push(specs);
    });

    if(plots.length) {
        commands.append("plot " + plots.join(', '));
    }

    return t(commands)(model);
};
