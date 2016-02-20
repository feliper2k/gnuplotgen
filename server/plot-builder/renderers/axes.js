module.exports = function (model) {
    var escape = require('js-string-escape');
    var _ = require('lodash'),
        t = _.template,
        result = '';

    ['x', 'y'].forEach(function(axis) {
        // sanitize user input
        var axisModel = _.mapValues(model.axes[axis], function (value) {
            return typeof value === 'string' ? escape(value) : value;
        });

        _.extend(axisModel, { axis: axis });
        var template = '';

        // labels
        if(axisModel.label) {
            template += 'set <%= axis %>label "<%= label %>"' + "\n";
        }

        // range
        if(axisModel.min && axisModel.max) {
            template += 'set <%= axis %>range [<%= min %>:<%= max %>]' + "\n";
        }

        // boolean values
        if(axisModel.zeroaxis) {
            template += 'set <%= axis %>zeroaxis lt 1 lc rgb "black"' + "\n";
        }
        if(axisModel.logscale) {
            template += 'set logscale <%= axis %>' + "\n";
        }

        // TICS SETTINGS
        // mirroring and position
        var mirrored = axisModel.ticsMirroring ? 'mirror' : 'nomirror';
        template += 'set <%= axis %>tics <%= ticsPosition %> ' + mirrored + "\n";

        // scaling
        template += 'set <%= axis %>tics scale <%= majorTics.scale %>, <%= minorTics.scale %> ' + "\n";

        if(axisModel.majorTics.enable) {
            // frequency
            template += 'set <%= axis %>tics <%= majorTics.frequency %>' + "\n";
        }
        // else {
        //     template += 'unset <%= axis %>tics' + "\n";
        // }

        if(axisModel.minorTics.enable) {
            // frequency
            template += 'set m<%= axis %>tics <%= minorTics.frequency %>' + "\n";
        }
        else {
            template += 'unset m<%= axis %>tics' + "\n";
        }


        // font settings
        if(!axisModel.style.fontFace) {
            axisModel.style.fontFace = model.style.fontFace;
        }
        if(!axisModel.style.fontSize) {
            axisModel.style.fontSize = model.style.fontSize;
        }

        template += 'set <%= axis %>tics font "<%= style.fontFace %>,<%= style.fontSize %>"' + "\n";

        result += t(template)(axisModel);
    });

    return result;
};
