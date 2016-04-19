'use strict';

const path = require('path');
const commonLoaders = require('./commonLoaders.js');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const jsLoader = {
  test: /\.js$/,
  loader: 'babel',
  exclude: /node_modules/,
  query: {
    presets: ["react", "es2015", "stage-2"],
    cacheDirectory: true
  }
}

const scssLoader = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap')
};

const config = {
    context: path.resolve(__dirname, '../src/'),
    devtool: 'eval',
    entry: {
      main: ['./index.js']
    },
    output: {
      path: __dirname, // Just don't let this field be empty.
      publicPath: '/assets/',
      filename: '[name].js'
    },
    module: {
      loaders: commonLoaders.concat([jsLoader, scssLoader])
    },
    postcss: [
      autoprefixer({ browsers: 'last 2 versions' })
    ],
    resolve: {
      modulesDirectories: [
        'node_modules', 'src'
      ]
    },
    plugins: [
      new ExtractTextPlugin('style/[name].css')
    ]
};

for (var key in config.entry) {
  config.entry[key].unshift('babel-polyfill');
}

module.exports = config;
