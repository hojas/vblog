const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env = 'env') => {
    const addPlugin = (add, plugin) => add ? plugin : undefined;
    const ifProd = plugin => addPlugin(env.prod, plugin);
    const removeEmpty = arr => arr.filter(i => !!i);

    return {
        entry: {
            app: './src/client/app.js',
            vendor: ['vue'],
        },
        output: {
            publicPath: '/dist/',
            path: resolve(__dirname, 'static/dist'),
            filename: '[name].js',
        },
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
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
            }],
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.common.js'
            }
        },
        plugins: removeEmpty([
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'],
            }),
            ifProd(new webpack.optimize.UglifyJsPlugin({
                compress:{
                    warnings: true
                }
            })),
            ifProd(new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })),
        ]),
        devServer: {
            contentBase: resolve(__dirname, './src'),
            port: 9000,
            compress: true,
        },
        devtool: env.prod ? 'cheap-source-map' : 'eval',
        watch: env.prod ? false : true,
    };
};

