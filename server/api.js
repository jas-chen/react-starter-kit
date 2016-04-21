const url = require('url');
const _ = require('lodash');
const faker = require('faker');
const server = require('json-server');
const proxy = require('proxy-middleware');

const port = 3002;

const data = {
  repos: _.times(5, index => {
    const name = faker.random.word();
    return {
      id: index,
      name: name,
      description: faker.lorem.sentence(),
      html_url: `https://github.com/jas-chen/${name}`
    };
  })
};

const app = server.create();
const router = server.router(data);

// Mock API
app.use(server.defaults());
app.use('/users/jas-chen', router);
app.use('/', proxy(url.parse(`https://api.github.com/`)));

app.listen(port, (error) => {
  if (error) throw error;
  console.info(`server running at http://localhost:${port}`);
});
