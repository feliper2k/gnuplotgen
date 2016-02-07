var fs = require('fs');
var gnuplot = require('gnuplot');
var bodyParser = require('body-parser');
var express = require('express');
var temp = require('temp').track();

var gpPlotBuilder = require('./plot-builder');
var gpVarParser = require('./gp-variables.js');
var gpUtils = require('./utils.js');

var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});

var settings = require('./settings.js');

var app = express();
var router = express.Router();

router.use(bodyParser.json());
router.use(express.static('.'));

router.use(function options(req, res, next) {
    if(req.method === 'OPTIONS') {
        gpUtils.preflight(res);
    }
    next();
});

router
.post('/plot', function (req, res) {
    var gnuplotModel = req.body;
    var gnuplotString = gpPlotBuilder(req.body).render('pngcairo');

    gpUtils.preflight(res);

    var gp = gnuplot();
    var gnuplotPrint = gp.print(gnuplotString)
        .println("\nshow variables all", { end: true});

    var bufs = [];

    gnuplotPrint.on('data', function (chunk) {
        bufs.push(chunk);
    })
    .on('end', function () {
        var imageUrl = 'data:image/png;base64,' + Buffer.concat(bufs).toString('base64');

        var responseObject = {
            image: imageUrl,
            status: {}
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
    gpUtils.preflight(res);

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

            // cleanup after grace period
            setTimeout(function () {
                fs.unlink(info.path);
            }, settings.temp.ttl);
        });
    });
})
.post('/script/simple', function (req, res) {
    gpUtils.preflight(res);

    var scriptString = gpPlotBuilder(req.body).render('epscairo');

    temp.open({ dir: 'tmp', prefix: 'gnuplot-script-', suffix: '.gp' }, function(err, info) {
        if (err) return;

        fs.write(info.fd, scriptString, function (err, written) {
            if (!err) {
                res.send({
                    path: info.path
                });

                fs.close(info.fd);

                // cleanup after grace period
                setTimeout(function () {
                    fs.unlink(info.path);
                }, settings.temp.ttl);
            }
            else res.send({
                error: errMsg
            });
        });
    });
});

// upload handling
router.post('/upload', upload.single('myData'), function () {


    // res.status('200').end(JSON.stringify(req.file));
});

app.use(router);
var server = app.listen(settings.server.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
