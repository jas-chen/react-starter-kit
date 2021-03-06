'use strict';

const path = require('path');
const webpack = require('webpack');
const buildConfig = require('../config.build');
const commonLoaders = require('./commonLoaders');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

const jsLoader = {
  test: /\.js$/,
  loader: 'babel',
  exclude: /node_modules/,
  query: {
    presets: ["react", "es2015", "stage-2"]
  }
}

const scssLoader = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
};

const config = {
    context: path.resolve(__dirname, '../src/'),
    devtool: 'source-map',
    entry: {
      main: ['./index.js']
    },
    output: {
      path: path.join(buildConfig.buildDir, buildConfig.assertsPath),
      publicPath: buildConfig.assertsPath,
      filename: '[chunkhash:8].[name].js'
    },
    module: {
      loaders: commonLoaders.concat([jsLoader, scssLoader])
    },
    postcss: [
      autoprefixer({ browsers: 'last 2 versions' })
    ],
    resolve: {
      modulesDirectories: [
        'node_modules'
      ]
    },
    plugins: [
      new ExtractTextPlugin('[chunkhash:8].[name].css'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("production")
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new StatsWriterPlugin({
        // generate stats.json under buildDir
        filename: '../stats.json'
      })
    ]
};

module.exports = config;
