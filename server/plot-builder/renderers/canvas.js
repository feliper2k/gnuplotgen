module.exports = function (model) {
    var output = '', canvasSize;

    // caveat:
    // epscairo output size is in INCHES, not PIXELS
    var dpiAdjustment = 72/100;

    output += "set terminal " + model.outputType + " enhanced";

    // canvas size
    if(model.canvas.width > 0 && model.canvas.height > 0) {
        switch(model.outputType) {
            case 'pngcairo':
            canvasSize = model.canvas.width + "," + model.canvas.height;
            break;
            case 'epscairo':
            canvasSize = model.canvas.width*dpiAdjustment/100 + "," + model.canvas.height*dpiAdjustment/100;
            break;
        }

        output += " size " + canvasSize;
    }

    if(model.style.colors === 'mono') {
        output += " mono";
    }

    return output;
};
