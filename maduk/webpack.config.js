var webpack = require('webpack');
var WebpackBuildNotifierPlugin = require("webpack-build-notifier");
var CONFIG = {
    proccess: 'dev'
}

var fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

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
    target: 'electron',
    entry: {
        ui: './program/ui.ts'
    },
    output: {
        filename: './program/boot/[name].bundle.js'
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
            }
        ]
    },
    externals: nodeModules
}