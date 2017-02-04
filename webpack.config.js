const { resolve } = require('path');
const webpack = require('webpack');

module.exports = env => {
    const addPlugin = (add, plugin) => add ? plugin : undefined;
    const ifProd = plugin => addPlugin(env.prod, plugin);
    const removeEmpty = arr => arr.filter(i => !!i);

    return {
        entry: {
            app: './src/app.js',
        },
        output: {
            path: resolve(__dirname, 'dist'),
            filename: '[name].js',
            pathinfo: !env.prod,
        },
        devtool: env.prod ? 'source-map' : 'eval',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: removeEmpty([
             ifProd(new webpack.optimize.UglifyJsPlugin({
                 compress:{
                     warnings: true
                 }
             })),
             ifProd(new webpack.DefinePlugin({
                 'process.env':{
                     'NODE_ENV': JSON.stringify('production')
                 }
             })),
         ]),
    };
};

