var settings = require('./settings');
var fs = require('fs');
var path = require('path');

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
        if(err.code === 'ENOENT')
        fs.mkdir(tempDir, function (err) {
            if(err) console.log('Error initializing temporary downloads directory' + err.message);
        });
    });
}

module.exports = {
    preflight: preflight,
    initializeTmpDirs: initializeTmpDirs
};
