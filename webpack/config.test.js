'use strict';

const path = require('path');
const commonLoaders = require('./commonLoaders');
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
  loader: ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
};

const config = {
    devtool: 'inline-source-map',
    module: {
      loaders: commonLoaders.concat([jsLoader, scssLoader])
    },
    resolve: {
      modulesDirectories: [
        'node_modules'
      ]
    },
    plugins: [
      new ExtractTextPlugin('[chunkhash:8].[name].css')
    ],
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
};

module.exports = config;
