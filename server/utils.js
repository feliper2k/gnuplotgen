var settings = require('./settings');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

function preflight(resStream) {
    resStream.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
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

module.exports = {
    preflight: preflight,
    initializeTmpDirs: initializeTmpDirs
    // log: log
};
