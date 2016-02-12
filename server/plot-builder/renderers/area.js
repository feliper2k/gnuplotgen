module.exports = function (model) {
    var escape = require('js-string-escape');
    var _ = require('lodash');
    var result = require('./utils').StringBuilder();

    if(model.title) {
        result.append('set title "', escape(model.title), '"');
    }

    // margins
    var margins = model.style.margins;

    _.each(margins, function (value, key) {
        if(value) {
            result.append('set ', key, ' at screen ', value);     // set lmargin/rmargin... at screen [value]
        }
    });

    // key
    if(model.style.key.enable) {
        var keyCommand = 'set key ';
        var keyModel = model.style.key;

        if(keyModel.position) {
            keyCommand += keyModel.position + ' ';
        }

        // title
        keyCommand += 'title "' + escape(keyModel.title) + '" enhanced ';

        if(keyModel.border) {
            keyCommand += 'box opaque';
        }

        result.append(keyCommand);
    }
    else {
        result.append('unset key');
    }

    return result.toString();
};
