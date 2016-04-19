'use strict'

const path = require('path');
const https = require('https');
const fs = require('fs');
const url = require('url');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const proxy = require('proxy-middleware');

const config = require('../webpack/config.dev');

const app = new (require('express'))();

const sslPath = path.join(__dirname, '..', 'node_modules', 'webpack-dev-server', 'ssl');
const htmlPath = path.resolve(__dirname, '../src/index.html');

const port = 3000;
const devPort = 3001;

const devUrl = url.parse(`https://localhost:${devPort}/assets`);
devUrl.rejectUnauthorized = false;

app.use('/assets', proxy(devUrl));

app.get('/', function response(req, res, next) {
  res.sendFile(htmlPath);
});

function StartHttpsServer() {
  https
  .createServer({
    key: fs.readFileSync(path.join(sslPath, 'server.key')),
    cert: fs.readFileSync(path.join(sslPath, 'server.crt'))
  }, app)
  .listen(port, (err) => {
    if (err) {
      console.err(err);
    } else {
      console.info(`==> App server is running on port ${port}. Open https://localhost:${port}/ to visit it.`);
      console.info(`==> Webpack dev server is running on port ${devPort}. Open https://localhost:${devPort}/ to visit it.`);
    }
  });
}

for (var key in config.entry) {
  config.entry[key].unshift(`webpack-dev-server/client?https://localhost:${devPort}`);
}

const webpackDevServer = new WebpackDevServer(webpack(config), {
  hot: false,
  quiet: false,
  noInfo: true,
  https: true,
  publicPath: '/assets',
  stats: { colors: true }
});

webpackDevServer.listen(devPort, (err) => {
  if (err) {
    console.err(err);
  } else {
    StartHttpsServer();
  }
});
