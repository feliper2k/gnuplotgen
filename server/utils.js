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
            // ignore empty lines and comments
            if(line.match(/^[#!]/) || line.match(/^\s*$/))
            return;

            if(++lineCount > previewSize) {
                rl.close();
                return;
            }

            // ignore inline comments
            line.replace(/[#!].+/, '');
            preview.push(line);
        });

        rl.on('close', function () {
            deferred.resolve(_.extend(file, {
                preview: preview
            }));
        });
    }

    return deferred.promise;
}

function dataFit(dataFile, params) {
    var fitOptions = params.options || {};
    var commands = require('./plot-builder/renderers/utils').StringBuilder();
    var _ = require('lodash');
    var t = _.template;

    // for replacing function template placeholders with variable names
    var varDummyObject = _.zipObject(params.variables, params.variables);

    params = _.extend(params, {
        file: dataFile,
        via: params.variables.join(','),
        using: params.columns.join(':'),
        fun: t(params.funTemplate)(varDummyObject)
    });

    var fitDataFile = dataFile + '-fit';    // convention

    function toString() {
        commands.append('set fit errorvariables');

        // fit limit
        if(fitOptions.limit) {
            commands.append(t('set fit limit <%= limit %>')(fitOptions));
        }

        commands.append(t("fit <%= fun %> '<%= file %>' using <%= using %> via <%= via %>")(params))

        // printing variables to file
        commands.append(t("set print '<%= printFile %>'")({ printFile: fitDataFile }));

        _.each(params.variables, function (varLetter) {
            commands.append(t('print sprintf("%.5f %.5f", <%= varLetter %>, <%= varLetter %>_err)')({ varLetter: varLetter }));
        });

        commands.append("");    // terminating newline
        return commands.toString();
    }

    function readFitData() {
        var fitVarsRaw = fs.readFileSync(fitDataFile, 'utf8');
        var coeffs = {}, errors = {}, fun;

        // parse variable data presented as follows
        // [a] [a_err]
        // [b] [b_err]
        // ..
        // [n] [n_err]

        _.each(fitVarsRaw.split(/[\r\n]+/), function (line, index) {
            if(line) {
                var vrbLetter = params.variables[index];
                var fitted = line.split(/\s+/);

                coeffs[vrbLetter] = fitted[0];
                errors[vrbLetter] = fitted[1];
            }
        });

        fun = t(params.funTemplate)(coeffs);

        // signs cleanup - suprisingly, no node libs for variable substitution, so a quick and dirty one:
        fun = fun.replace(/\+\-/g, '-').replace(/\-\-/g, '+');

        return {
            fun: fun,
            coeffs: coeffs,
            errors: errors
        };
    }

    return {
        readFitData: readFitData,
        toString: toString
    };
}

module.exports = {
    preflight: preflight,
    initializeTmpDirs: initializeTmpDirs,
    validateDatafile: validateDatafile,
    dataFit: dataFit
    // log: log
};
