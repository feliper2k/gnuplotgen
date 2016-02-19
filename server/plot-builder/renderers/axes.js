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
            template += 'set <%= axis %>zeroaxis lt 1 lc rgb "black"' + "\n";
        }
        if(escapedModel.logscale) {
            template += 'set logscale <%= axis %>' + "\n";
        }

        result += t(template)(escapedModel);
    });

    // tics
    var mirrored = model.style.tics.mirror ? 'mirror' : 'nomirror';
    template = 'set tics <%= position %> ' + mirrored;

    // if(model.style.tics.fontFace && model.style.tics.fontSize)

    if(!model.style.tics.fontFace) {
        model.style.tics.fontFace = model.style.fontFace;
    }
    if(!model.style.tics.fontSize) {
        model.style.tics.fontSize = model.style.fontSize;
    }

    template += ' font "<%= fontFace %>,<%= fontSize %>"';

    template += "\nunset x2tics\nunset y2tics\nunset cbtics\n";

    var escapedModel = _.mapValues(model.style.tics, function (value) {
        return typeof value === 'string' ? escape(value) : value;
    });
    result += t(template)(escapedModel) + "\n";

    return result;
};
