'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        details: './app/public/js/post/details.js',
        new: './app/public/js/post/new.js',
    },
    output: {
        path: path.join(__dirname, 'app/public/js/dest'),
        filename: '[name].js',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
};

