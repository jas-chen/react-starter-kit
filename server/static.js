const path = require('path');
const express = require('express');
const https = require('https');
const fs = require('fs');
const buildConfig = require('../config.build');
const sslPath = path.join(__dirname, '..', 'node_modules', 'webpack-dev-server', 'ssl');

const app = express();

const port = 3000;

app.use(express.static(buildConfig.buildDir));

https
  .createServer({
    key: fs.readFileSync(path.join(sslPath, 'server.key')),
    cert: fs.readFileSync(path.join(sslPath, 'server.crt'))
  }, app)
  .listen(port, () => {
    console.log(`==> Static server is running on port ${port}. Open https://localhost:${port}/ to visit it.`);
    console.log(`==> Serve files from ${buildConfig.buildDir}.`);
  });
