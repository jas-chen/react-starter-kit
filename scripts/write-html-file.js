import path from 'path';
import fs from 'fs';
import config from '../webpack/config.prod.js';
import Injector from '../shared/html-injector.js';

const distPath = path.join(config.output.path, '..');
const injector = new Injector(config.output.publicPath, ['main']);
const stats = JSON.parse(fs.readFileSync(path.join(distPath, 'stats.json')).toString());
const html = injector.inject(stats.assetsByChunkName);

fs.writeFileSync(path.join(distPath, 'index.html'), html);
