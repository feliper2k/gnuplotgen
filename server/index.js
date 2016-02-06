var fs = require('fs');
var gnuplot = require('gnuplot');
var microtime = require('microtime');
var bodyParser = require('body-parser');
var express = require('express');
var temp = require('temp');

var gpPlotBuilder = require('./plot-builder');
var gpVarParser = require('./gp-variables.js');


var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});

var app = express();
var router = express.Router();

router.use(bodyParser.json());
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
.options('/eps', function (req, res) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers:': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    res.end();
})
.post('/plot', function (req, res) {
    var gnuplotModel = req.body;
    var gnuplotString = gpPlotBuilder(req.body).render('pngcairo');

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers:': 'Origin, X-Requested-With, Content-Type, Accept'
    });

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

        var imageUrl = 'data:image/png;base64,' + Buffer.concat(bufs).toString('base64');

        var responseObject = {
            image: imageUrl,
            status: {
                execTime: mtSeconds,
                fps: framesPerSecond
            }
        };

        gp.done.then(function success(status) {
            responseObject.status.variables = gpVarParser.parse(status);
            res.status(200).send(JSON.stringify(responseObject)).end();
        }, function failure(errMsg) {
            // error messages are several first lines of the errMsg
            var failureMsg = errMsg.split(/[\r\n]/).slice(0,4).join("\n");

            res.status(400).send(JSON.stringify({
                error: failureMsg
            })).end();
        });
    });

    gnuplotPrint.resume();
})
.post('/eps', function (req, res) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers:': 'Origin, X-Requested-With, Content-Type, Accept'
    });

    var gnuplotModel = req.body;
    var gnuplotString = gpPlotBuilder(req.body).render('epscairo');

    temp.open({ dir: 'tmp', prefix: 'gnuplot-eps-', suffix: '.eps' }, function(err, info) {
        if (err) return;

        var tmpStream = fs.createWriteStream('', { fd: info.fd });
        gnuplot().print(gnuplotString, {end: true}).pipe(tmpStream);

        tmpStream.on('finish', function () {
            res.send({
                path: info.path
            });
        });
    });
})

// upload handling
router.post('/upload', upload.single('myData'), function () {


    // res.status('200').end(JSON.stringify(req.file));
});

app.use(router);
var server = app.listen(8001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
