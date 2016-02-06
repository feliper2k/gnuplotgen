module.exports = function (model) {
    var t = require('lodash').template,
        template = 'set termoption font "<%= fontFace %>,<%= fontSize %>"';

    return t(template)(model.style);
};
