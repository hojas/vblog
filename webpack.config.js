'use strict';

var path = require('path');

module.exports = {
    entry: './app/public/js/app.js',
    output: {
        path: path.join(__dirname, 'app/public/js'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css', },
        ],
    },
};

