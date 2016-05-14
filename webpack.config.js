var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
    {
        name: 'browser',
        entry: './app/client.js',

        output: {
            path: './build/public',
            filename: 'client.bundle.js',
            publicPath: ''
        },

        module: {
            loaders: [
                { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
            ]
        },

        node: {
            "net": "empty",
            "tls": "empty",
            "fs": "empty",
            "module": "empty"
        },

        plugins: process.env.NODE_ENV === 'production' ? [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new CopyWebpackPlugin([{from: './public'}])
        ] : [
            new CopyWebpackPlugin([{from: './public'}])
        ]
    }
]