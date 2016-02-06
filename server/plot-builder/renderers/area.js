module.exports = function (model) {
    var escape = require('js-string-escape');

    if(model.title) {
        return 'set title "' + escape(model.title) + '"';
    }

    return "";
};
