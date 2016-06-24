'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: '#source-map',
    watch: false,
    entry: {
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

