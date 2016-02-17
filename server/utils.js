var settings = require('./settings');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var Q = require('q');
var readline = require('readline');
var _ = require('lodash');

function preflight(resStream) {
    resStream.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
}

function initializeTmpDirs() {
    var tempDir = path.resolve(settings.temp.downloadsDir);
    // check for existence and otherwise initialize temporary dirs
    fs.readdir(tempDir, function (err) {
        if(err && err.code === 'ENOENT')
        fs.mkdir(tempDir, function (err) {
            if(err) console.log('Error initializing temporary downloads directory: ' + err.message);
        });
    });
}



function log(type, msg) {
    var logColor = {
        'warn': 'yellow',
        'error': 'red',
        'ok': 'green'
    }[type];

    function writeToConsole(msg, rest) {
        var argsArray = Array.apply(null, arguments);
        argsArray.slice(2);
        argsArray.unshift('%s - ' + chalk[logColor](msg), new Date().toUTCString());
        console.log.apply(console, argsArray);
    }

    writeToConsole(arguments);
}

function validateDatafile(file) {
    var deferred = Q.defer();
    var fileSizeLimit = 1024*1024;      // additional limit upon multer's default limit of 1MB
    var previewSize = 12;               // how many lines to read for file preview

    if(!file) {
        deferred.reject('Error: expected file input');
    }
    else if(file.size > fileSizeLimit) {
        deferred.reject('Error: input file larger than ' + fileSizeLimit + ' bytes');
        fs.unlink(file.path);
    }
    else {
        var rl = readline.createInterface({
            input: fs.createReadStream(file.path)
        });

        var lineCount = 0,
            preview  = [];

        rl.on('line', function (line) {
            if(++lineCount > previewSize) {
                rl.close();

                deferred.resolve(_.extend(file, {
                    preview: preview
                }));
                return;
            }

            preview.push(line);
        });
    }

    return deferred.promise;
}

module.exports = {
    preflight: preflight,
    initializeTmpDirs: initializeTmpDirs,
    validateDatafile: validateDatafile
    // log: log
};
