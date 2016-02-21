module.exports = function (model) {
    var output = '', canvasSize;

    // caveat:
    // epscairo output size is in INCHES, not PIXELS
    var dpiAdjustment = 72/100;
    var outputTerminal = {
        'png': 'pngcairo',
        'eps': 'postscript eps'
    }[model.outputType];

    output += "set terminal " + outputTerminal + " enhanced";

    // canvas size
    if(model.canvas.width > 0 && model.canvas.height > 0) {
        switch(model.outputType) {
            case 'png':
            canvasSize = model.canvas.width + "," + model.canvas.height;
            break;
            case 'eps':
            canvasSize = model.canvas.width*dpiAdjustment/100 + "," + model.canvas.height*dpiAdjustment/100;
            break;
        }

        output += " size " + canvasSize;
    }

    if(model.style.colors === 'mono') {
        output += " mono dashed";
    }

    return output;
};
