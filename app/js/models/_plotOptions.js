module.exports = {
    fontFace: ['serif', 'sans', 'Arial', 'Times', 'Georgia', 'Helvetica'],
    lineStyle: {
        plotWith: [{
            label: 'Lines + Points',
            value: 'linespoints'
        },
        {
            label: 'Lines',
            value: 'lines'
        },
        {
            label: 'Points',
            value: 'points'
        },
        {
            label: 'Impulses',
            value: 'impulses'
        },
        {
            label: 'Errorbars (X)',
            value: 'xerrorbars'
        },
        {
            label: 'Errorbars (Y)',
            value: 'yerrorbars'
        },
        {
            label: 'Errorbars (XY)',
            value: 'xyerrorbars'
        },
        {
            label: 'Errorlines (X)',
            value: 'xerrorlines'
        },
        {
            label: 'Errorlines (Y)',
            value: 'yerrorlines'
        },
        {
            label: 'Errorlines (XY)',
            value: 'xyerrorlines'
        }],

        lineColor: [{
            label: 'Black',
            value: '#000000'
        },
        {
            label: 'Carbon',
            value: '#555555'
        },
        {
            label: 'Red',
            value: '#f44336'
        },
        {
            label: 'Pink',
            value: '#e91e63'
        },
        {
            label: 'Purple',
            value: '#9c27b0'
        },
        {
            label: 'Deep Purple',
            value: '#673ab7'
        },
        {
            label: 'Indigo',
            value: '#3f51b5'
        },
        {
            label: 'Blue',
            value: '#2196f3'
        },
        {
            label: 'Light Blue',
            value: '#03a9f4'
        },
        {
            label: 'Cyan',
            value: '#00bcd4'
        },
        {
            label: 'Teal',
            value: '#009688'
        },
        {
            label: 'Green',
            value: '#4caf50'
        },
        {
            label: 'Light Green',
            value: '#8bc34a'
        },
        {
            label: 'Lime',
            value: '#cddc39'
        },
        {
            label: 'Yellow',
            value: '#ffeb3b'
        },
        {
            label: 'Orange',
            value: '#ff9800'
        },
        {
            label: 'Deep Orange',
            value: '#ff5722'
        },
        {
            label: 'Brown',
            value: '#795548'
        },
        {
            label: 'Blue Grey',
            value: '#607d8b'
        }],

        randomLineColor: function() {
            let _ = require('lodash');

            let colorRange = this.lineColor.length - 1;
            return this.lineColor[_.random(0, colorRange)].value;
        },

        pointType: ['None','Plus','Cross','Star','Box','Filled box',
                    'Circle','Filled circle','Triangle','Filled triangle',
                    'Inverted triangle','Filled inverted triangle',
                    'Diamond','Filled diamond']
    },
    fontSize: ['6', '8', '10', '11', '12', '14',
               '16', '18', '20', '22', '24', '28',
               '32', '36', '48', '64', '72'],
    colors: [{
        id: 'full', label: 'Full color'
    }, {
        id: 'mono', label: 'Monochrome'
    }]
};
