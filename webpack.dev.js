const { resolve } = require('path')
const webpack  = require('webpack')
const Merge = require('webpack-merge')
const BaseConfig = require('./webpack.base')

module.exports = Merge(BaseConfig, {
    watch: true,
    devtool: 'eval',
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: true
            }
        }),
    ],
    devServer: {
        contentBase: resolve(__dirname, './src'),
        port: 9000,
        compress: true,
    },
})

