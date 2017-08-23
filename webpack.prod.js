const webpack = require('webpack')
const Merge = require('webpack-merge')
const BaseConfig = require('./webpack.base')

module.exports = Merge(BaseConfig, {
    watch: false,
    devtool: '#cheap-source-map',
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ],
})

