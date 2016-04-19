'use strict';

const path = require('path');
const commonLoaders = require('./commonLoaders.js');
const autoprefixer = require('autoprefixer');

const scssLoader = {
  test: /\.scss$/,
  loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap'
};

const config = {
    output: {
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: commonLoaders.concat([scssLoader])
    },
    postcss: [
      autoprefixer({ browsers: 'last 2 versions' })
    ],
    resolve: {
      modulesDirectories: [
        'node_modules', 'src'
      ]
    }
};

for (var key in config.entry) {
  config.entry[key].unshift('babel-polyfill');
}

module.exports = config;
