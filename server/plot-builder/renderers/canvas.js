module.exports = function (model) {
    // model.outputType
    var output = '', canvasSize;
    // var canvasSize = model.canvas.width + "px," + model.canvas.height + "px";

    // TODO/caveat:
    // epscairo output size is in INCHES, not PIXELS -> maybe plan an optional size adjustment for export?

    output += "set terminal " + model.outputType + " enhanced";

    // canvas size
    if(model.canvas.width > 0 && model.canvas.height > 0) {
        switch(model.outputType) {
            case 'pngcairo':
            canvasSize = model.canvas.width + "," + model.canvas.height;
            break;
            case 'epscairo':
            canvasSize = model.canvas.width/100 + "," + model.canvas.height/100;
            break;
        }

        output += " size " + canvasSize;
    }

    return output;
};
