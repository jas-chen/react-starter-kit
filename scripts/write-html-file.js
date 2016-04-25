import path from 'path';
import fs from 'fs';

import config from '../webpack/config.prod';
import buildConfig from '../config.build';
import inject from '../shared/html-injector';
import { routes } from '../config.routes';

const stats = JSON.parse(fs.readFileSync(path.join(buildConfig.buildDir, 'stats.json')).toString());

function fileExist(file) {
  let exist = true;
  try {
    fs.statSync(file);
  } catch(e) {
    if (e.errno === -2) {
      exist = false;
    }
  }

  return exist;
}

routes.forEach(route => {
  const html = inject(route, stats.assetsByChunkName);
  const routeDir = path.join(buildConfig.buildDir, route.path);
  const filename = path.join(routeDir, 'index.html');

  if (!fileExist(routeDir)) {
    fs.mkdirSync(routeDir);
  }

  fs.writeFile(filename, html, (err) => {
    if (err) throw err;
  });
});
