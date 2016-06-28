'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: '#source-map',
    watch: false,
    entry: {
        app: './app/public/js/app.js',
    },
    output: {
        path: path.join(__dirname, 'app/public/js/dest'),
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'app/public/js')
        }]
    },
    externals: {
        jquery: 'jQuery',
        bootstrap: 'bootstrap',
        hljs: 'hljs',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 })
    ],
};

