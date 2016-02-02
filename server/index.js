var fs = require('fs');
var gnuplot = require('gnuplot');
var microtime = require('microtime');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var express = require('express');
var gpVarParser = require('./gp-variables.js');

var app = express();
var router = express.Router();

var plotFile = process.argv[2] || 'simple.1.gnu';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('.'));

router.use(function timeLog(req, res, next) {
    // console.log(req);
    next();
});

router
.options('/plot', function (req, res) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers:': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    res.end();
})
.post('/plot', function (req, res) {
    var gnuplotString = req.body.commands;

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers:': 'Origin, X-Requested-With, Content-Type, Accept'
    });

    // generate e-tag so that changed requests won't be cached
    if(gnuplotString) {
        var eTag = crypto.createHash('md5').update(gnuplotString, 'utf8').digest('hex');
        res.set('ETag', eTag);
    }

    // var mtStart = microtime.now();
    var gp = gnuplot();
    var gnuplotPrint = gp.print(gnuplotString)
        .println("\nshow variables all", { end: true});

    var mtStart = microtime.now();
    var bufs = [];

    gnuplotPrint.on('data', function (chunk) {
        bufs.push(chunk);
    })
    .on('end', function () {
        var mtDelta = microtime.now() - mtStart;
        var mtSeconds = (mtDelta/1000000).toFixed(5)+'s';
        var framesPerSecond = (1000000/mtDelta).toFixed(1);

        var responseObject = {
            image: 'data:image/png;base64,' + Buffer.concat(bufs).toString('base64'),
            status: {
                execTime: mtSeconds,
                fps: framesPerSecond
            }
        };

        gp.done.then(function success(status) {
            responseObject.status.variables = gpVarParser.parse(status);
            res.status(200).send(JSON.stringify(responseObject)).end();
        }, function failure(errMsg) {
            // error messages are three first lines of the errMsg
            var failureMsg = errMsg.split(/[\r\n]/).slice(1,4).join("\n");

            res.status(400).send(JSON.stringify({
                error: failureMsg
            })).end();
        });
    });

    gnuplotPrint.resume();
})
.post('/eps', function (req, res) {
    res.set({
        'Content-type': 'application/eps',
        'Content-disposition': 'attachment; filename=plot.eps'
    });
})
.post('/codedl', function (req, res) {
    res.set({
        'Content-type': 'text/plain',
        'Content-disposition': 'attachment; filename=plot-script.gp'
    });
});

app.use(router);
var server = app.listen(8001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
