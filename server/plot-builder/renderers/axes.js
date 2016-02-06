module.exports = function (model) {
    var escape = require('js-string-escape');
    var _ = require('lodash'),
        t = _.template,
        result = '';

    ['x', 'y', 'z'].forEach(function(axis) {
        // sanitize user input
        var escapedModel = _.mapValues(model.axes[axis], function (value) {
            return typeof value === 'string' ? escape(value) : value;
        });

        _.extend(escapedModel, { axis: axis });
        var template = '';

        // labels
        if(escapedModel.label) {
            template += 'set <%= axis %>label "<%= label %>"' + "\n";
        }

        // range
        if(escapedModel.min && escapedModel.max) {
            template += 'set <%= axis %>range [<%= min %>:<%= max %>]' + "\n";
        }

        // boolean values
        if(escapedModel.zeroaxis) {
            template += 'set <%= axis %>zeroaxis' + "\n";
        }
        if(escapedModel.logscale) {
            template += 'set logscale <%= axis %>' + "\n";
        }

        result += t(template)(escapedModel);
    });

    return result;
};
