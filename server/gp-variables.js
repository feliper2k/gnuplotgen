var _ = require('lodash');
var Q = require('q');

function parseToObject(inputString) {
    var valuePattern = /(GPVAL_\S+)\s=\s\"?([^\"\n\t]+)/g,      // variable pattern: GPVAL_name = "string" OR GPVAL_name = flo.at
        result = {}, match;

    while(match = valuePattern.exec(inputString)) {
        var key = match[1], value = match[2];
        result[key] = value;
    }

    return result;
}

function feed(inputStream) {
    var buffer = [];
    var deferred = Q.defer();

    inputStream.on('data', function (chunk) {
        buffer.push(chunk);
    });
    inputStream.on('end', function () {
        var inputText = Buffer.concat(buffer).toString('ascii');
        deferred.resolve(parseToObject(inputText));
    });

    return deferred.promise;
}

exports.feed = feed;
exports.parse = parseToObject;
