'use strict'

import path from 'path';
import https from 'https';
import fs from 'fs';
import url from 'url';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import proxy from 'proxy-middleware';
import config from '../webpack/config.dev';
import Injector from '../shared/html-injector.js';

const injector = new Injector(config.output.publicPath, ['main']);

const app = new (require('express'))();

const sslPath = path.join(__dirname, '..', 'node_modules', 'webpack-dev-server', 'ssl');


const port = 3000;
const devPort = 3001;

const publicPath = `https://localhost:${devPort}${config.output.publicPath}`;
const statsUrl = url.parse(`${publicPath}stats.json`);
statsUrl.rejectUnauthorized = false;

function getStats(cb) {
  https.get(statsUrl, (statsRes) => {
    let body = '';

    if (statsRes.statusCode !== 200) {
      throw new Error(`Cannot get webpack stats from ${statsUrl.href}. Status code is ${statsRes.statusCode}.`);
    }

    statsRes.on('data', (chunk) => body += chunk);
    statsRes.on('end', () => cb(JSON.parse(body)));
  }).on('error', e => { throw e; });
}

// proxy to webpack dev server
const devUrl = url.parse(publicPath);
devUrl.rejectUnauthorized = false;
app.use(`${config.output.publicPath}`, proxy(devUrl));


// serve index.html
app.get('/', function response(req, res, next) {
  getStats(stats => {
    const html = injector.inject(stats.assetsByChunkName);
    res.send(html);
  });
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
  publicPath: config.output.publicPath,
  stats: { colors: true }
});

webpackDevServer.listen(devPort, (err) => {
  if (err) {
    console.err(err);
  } else {
    StartHttpsServer();
  }
});
