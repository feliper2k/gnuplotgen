module.exports = function (model) {
    // model.outputType
    var canvasSize;
    // var canvasSize = model.canvas.width + "px," + model.canvas.height + "px";

    // TODO/caveat:
    // epscairo output size is in INCHES, not PIXELS -> maybe plan an optional size adjustment for export?

    switch(model.outputType) {
        case 'pngcairo':
        canvasSize = model.canvas.width + "," + model.canvas.height;
        break;
        case 'epscairo':
        canvasSize = model.canvas.width/100 + "," + model.canvas.height/100;
        break;
    }

    return "set terminal " + model.outputType
        + " enhanced size " + canvasSize;
};
