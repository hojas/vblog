const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['vue', 'vue-router', 'vuex']
    },
    output: {
        path: resolve(__dirname, 'static/dist'),
        filename: '[name].js',
        publicPath: '/dist/',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                extractCSS: true
            },
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 }},
                'postcss-loader'
            ]
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
            vue$: 'vue/dist/vue.esm.js',
        }
    }
}

