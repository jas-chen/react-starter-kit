const webpack = require('webpack');
const webpackConfig = require('./webpack/config.dev.js');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.externals = webpackConfig.externals || {};

Object.assign(webpackConfig.externals, {
  cheerio: 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
});

module.exports = function set(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap', 'coverage']
    },
    reporters: ['mocha', 'coverage'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      type: 'text',
      dir: 'coverage/',
      file: 'coverage.txt'
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-coverage'
    ]
  });
};
