const url = require('url');
const _ = require('lodash');
const faker = require('faker');
const server = require('json-server');
const proxy = require('proxy-middleware');

const port = 3002;

const app = server.create();

// mock endpoint
const repoRouter = server.router({
  repos: _.times(5, index => {
    const name = faker.random.word();
    return {
      id: index,
      name: name,
      description: faker.lorem.sentence(),
      html_url: `https://github.com/jas-chen/${name}`
    };
  })
});

// proxy to real api server
const proxyRouter = proxy(url.parse(`https://api.github.com/`));

app.use(server.defaults());

app.use((req, res, next) => {
  if (req.originalUrl === '/users/jas-chen/repos') {
    repoRouter(req, res, next);
    return;
  }

  proxyRouter(req, res, next);
});

app.listen(port, (error) => {
  if (error) throw error;
  console.info(`server running at http://localhost:${port}`);
});
