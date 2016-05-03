const webpackConfig = require('./webpack/config.test.js');

module.exports = function set(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap', 'sourcemap-writer', 'coverage']
    },
    reporters: ['mocha', 'coverage'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      type: 'json',
      subdir: '.',
      file: 'coverage-final.json'
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-sourcemap-writer',
      'karma-coverage'
    ]
  });
};
