const https = require('https');
const path = require('path');
const fs = require('fs');
const url = require('url');
const _ = require('lodash');
const faker = require('faker');
const server = require('json-server');
const proxy = require('proxy-middleware');

const port = 3002;
const sslPath = path.join(__dirname, '..', 'node_modules', 'webpack-dev-server', 'ssl');
const app = server.create();

// mock endpoint
const repoRouter = server.router({
  repos: _.times(5, index => {
    const name = faker.random.word();
    return {
      id: index,
      name,
      description: faker.lorem.sentence(),
      html_url: `https://github.com/jas-chen/${name}`
    };
  })
});

// proxy to real api server
const proxyRouter = proxy(url.parse('https://api.github.com/'));

app.use(server.defaults());

app.use((req, res, next) => {
  if (req.originalUrl === '/users/jas-chen/repos') {
    repoRouter(req, res, next);
    return;
  }

  proxyRouter(req, res, next);
});

https
.createServer({
  key: fs.readFileSync(path.join(sslPath, 'server.key')),
  cert: fs.readFileSync(path.join(sslPath, 'server.crt'))
}, app)
.listen(port, (err) => {
  if (err) {
    console.err(err);
  } else {
    console.info(`==> Api server is running on port ${port}. Open https://localhost:${port}/ to visit it.`);
  }
});
