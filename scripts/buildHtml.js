const path = require('path');
const fs = require('fs');
const config = require('../webpack/config.prod.js');
const Injector = require('../shared/html-injector.js');

const distPath = path.join(config.output.path, '..');
const injector = new Injector(path.join(__dirname, '../src/index.html'), config.output.publicPath, ['main']);
const stats = JSON.parse(fs.readFileSync(path.join(distPath, 'stats.json')).toString());
const html = injector.inject(stats.assetsByChunkName);

fs.writeFileSync(path.join(distPath, 'index.html'), html);
