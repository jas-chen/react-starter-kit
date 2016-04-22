const webpack = require('webpack');
const webpackConfig = require('./webpack/config.dev.js');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.externals = webpackConfig.externals || {};

Object.assign(webpackConfig.externals, {
  'cheerio': 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
});

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'spec' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
