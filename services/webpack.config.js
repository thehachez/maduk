const webpack = require('webpack');
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const CONFIG = {
    proccess: 'dev'
}

module.exports = {
    devtool: 'source-map',
    debug: true,
    cache: true,
    watch: true,
    target: 'web',
    entry: {
        clientroot: './program/core/webserver/client/clientroot.tsx'
    },
    output: {
        filename: './program/core/webserver/client/statics/[name].bundle.js'
    },
    plugins: [
        new WebpackBuildNotifierPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json',
                exclude: /node_modules/
            }, {
                test: /\.ts(x?)$/,
                loader: 'babel-loader!ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}   