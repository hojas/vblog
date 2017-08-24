const { resolve } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: './src/client/app.js',
        vendor: ['vue']
    },
    output: {
        path: resolve(__dirname, 'static/dist'),
        filename: '[name].js',
        publicPath: '/dist/',
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                fix: true,
            },
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src')]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: 'vue-style-loader!style-loader!css-loader!sass-loader',
                    sass: 'vue-style-loader!style-loader!css-loader!sass-loader?indentedSyntax',
                },
            },
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!sass-loader',
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader',
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                name: '[name].[ext]?[hash]',
            },
        }]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.common.ja',
        }
    }
}

