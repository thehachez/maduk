var webpack = require('webpack');
var path = require("path");
var WebpackBuildNotifierPlugin = require("webpack-build-notifier");
var CONFIG = {
    proccess: 'dev'
}

module.exports = {
    context: __dirname,
    node: {
        __dirname: true,
        __filename: false
    },
    devtool: 'source-map',
    debug: true,
    cache: true,
    watch: true,
    target: 'web',
    entry: {
        clientroot: './services/webserver/client/clientroot.tsx'
    },
    output: {
        path: path.resolve(__dirname, "services/webserver/client/statics"),
        filename: '[name].js'
    },
    plugins: [
        new WebpackBuildNotifierPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
            $dirname: '__dirname'
        })
    ],
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json',
                exclude: /node_modules/
            }, {
                test: /\.ts(x?)$/,
                loader: 'awesome-typescript-loader',
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