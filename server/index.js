var fs = require('fs');
var gnuplot = require('gnuplot');
var bodyParser = require('body-parser');
var express = require('express');
var temp = require('temp').track();
var chalk = require('chalk');

var gpPlotBuilder = require('./plot-builder');
var gpVarParser = require('./gp-variables.js');
var gpUtils = require('./utils.js');
var settings = require('./settings.js');

var multer = require('multer');
var upload = multer({
    dest: settings.temp.uploadsDir
});


var app = express();
var router = express.Router();

router.use(bodyParser.json());
// router.use(bodyParser.raw({
//     type: 'text/plain'
// }));
router.use(express.static('.'));

router.use(function options(req, res, next) {
    if(req.method === 'OPTIONS') {
        gpUtils.preflight(res);
    }
    next();
});

gpUtils.initializeTmpDirs();

router
.post('/plot', function (req, res) {
    var gnuplotModel = req.body;
    var gnuplotString = gpPlotBuilder(req.body).render('png');

    gpUtils.preflight(res);

    var gp = gnuplot();
    var gnuplotPrint = gp.print(gnuplotString)
        .println("\nshow variables all", { end: true});

    var bufs = [];

    gnuplotPrint.on('data', function (chunk) {
        bufs.push(chunk);
    })
    .on('end', function () {
        var imageUrl = "";
        var imageData = Buffer.concat(bufs).toString('base64');

        if(imageData) {
            imageUrl = 'data:image/png;base64,' + Buffer.concat(bufs).toString('base64');
        }

        var responseObject = {
            image: imageUrl,
            status: {}
        };

        console.log('%s - Image rendered successfully', new Date().toUTCString());

        gp.done.then(function success(status) {
            responseObject.status.variables = gpVarParser.parse(status);
            res.status(200).send(JSON.stringify(responseObject)).end();
        }, function failure(errMsg) {
            // error messages are several first lines of the errMsg
            var failureMsg = errMsg.split(/[\r\n]/).slice(0,4).join("\n");

            res.status(400).send(JSON.stringify({
                error: failureMsg
            })).end();

            console.log(chalk.red('Rendering error: ' + failureMsg));
        });
    });

    gnuplotPrint.resume();
})
.post('/eps', function (req, res) {
    gpUtils.preflight(res);

    var gnuplotModel = req.body;
    var gnuplotString = gpPlotBuilder(req.body).render('eps');

    temp.open({ dir: 'tmp', prefix: 'gnuplot-eps-', suffix: '.eps' }, function(err, info) {
        if (err) {
            console.log(chalk.red('I/O error: ' + err));
            return;
        }

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

    var scriptString = gpPlotBuilder(req.body).render('eps');

    temp.open({ dir: 'tmp', prefix: 'gnuplot-script-', suffix: '.gp' }, function(err, info) {
        if (err) {
            console.log(chalk.red('I/O error: ' + err));
            return;
        }

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
            else {
                res.send({
                    error: err
                });

                console.log(chalk.red('Gnuplot error: ' + err));
            }
        });
    });
});

// upload handling
router.post('/upload', upload.single('plotData'), function (req, res, next) {
    gpUtils.preflight(res);

    gpUtils.validateDatafile(req.file).then(function success(fileMeta) {
        res.status(200).send(fileMeta).end();
    }, function failure(reason) {
        res.status(400).send({
            error: reason
        }).end();
    });
});

// cleanup
router.delete('/upload/:id', function (req, res, next) {
    gpUtils.preflight(res);

    var filePath = settings.temp.uploadsDir + '/' + req.params.id;

    fs.unlink(filePath, function (err) {
        if(err) {
            res.status(404).send({
                error: 'Error: upload not found'
            }).end();

            return;
        }

        res.status(200).end();
    });
});

// data fitting
router.post('/fit/:id', function (req, res, next) {
    gpUtils.preflight(res);

    var filePath = settings.temp.uploadsDir + '/' + req.params.id;
    var dataFit = gpUtils.dataFit(filePath, req.body);

    var gp = gnuplot();
    gp.print(dataFit.toString(), { end: true });
    gp.on('end', function () {
        res.status(200).send(dataFit.readFitData()).end();
    });
});


app.use(router);
var server = app.listen(settings.server.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log(chalk.green('Gnuplot server listening at ') +  'http://%s:%s', host, port);
});
