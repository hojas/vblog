'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './app/public/js/app.js',
    output: {
        path: path.join(__dirname, 'app/public/js'),
        filename: 'bundle.js',
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jshint-loader',
        }],
        loaders: [
            { test: /\.css$/, loader: 'style!css', },
        ],
    },
    jshint: {
        //camelcase: true,
        emitErrors: true,
        failOnHint: false,
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
};

