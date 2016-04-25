import React from 'react';
import ReactDOMServer from 'react-dom/server';
const buildConfig = require('../config.build.js');

function Html(props) {
  const { chunks, route } = props;

  return (
    <html lang="zh-hant">
    <head>
      <meta charSet="UTF-8" />
      <title>{ route.title }</title>
      { chunks.css.map((href, i) => <link key={i} rel="stylesheet" href={href} />) }
    </head>
    <body>
      <div id="root"></div>
      { chunks.js.map((src, i) => <script key={i} src={src}></script>) }
    </body>
    </html>
  );
}

function inject(route, assetsByChunkName) {
  const chunks = route.chunks.reduce((chunks, name) => {
    if (typeof assetsByChunkName[name] === 'string') {
      chunks.js.push(`${buildConfig.assertsPath}${assetsByChunkName[name]}`);
      return chunks;
    }

    const jsFile = assetsByChunkName[name].find(filename => filename.match(/\.js$/));
    if (jsFile) {
      chunks.js.push(`${buildConfig.assertsPath}${jsFile}`);
    }

    const cssFile = assetsByChunkName[name].find(filename => filename.match(/\.css$/));
    if (cssFile) {
      chunks.css.push(`${buildConfig.assertsPath}${cssFile}`);
    }

    return chunks;
  }, { js: [], css: []});

  const markup = ReactDOMServer.renderToStaticMarkup(<Html chunks={chunks} route={route}/>);
  return `<!DOCTYPE html>${markup}`;
}

export default inject;
