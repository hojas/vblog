const webpack = require('webpack')
const Merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BaseConfig = require('./webpack.base')

module.exports = Merge(BaseConfig, {
    watch: false,
    devtool: '#cheap-source-map',
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'vendor', 'manifest'],
            minChunks: 2,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: true,
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
        }),
    ],
})

