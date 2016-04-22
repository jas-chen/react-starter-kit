import React from 'react';
import ReactDOMServer from 'react-dom/server';

function Injector(publicPath, chunkNames) {
  this.finalPath = publicPath || '/';
  this.chunkNames = chunkNames;
}

function Html(props) {
  const { js, css } = props.chunks;

  return (
    <html lang="zh-hant">
    <head>
      <meta charSet="UTF-8" />
      <title>React Starter Kit</title>
      { css.map((href, i) => <link key={i} rel="stylesheet" href={href} />) }
    </head>
    <body>
      <div id="root"></div>
      { js.map((src, i) => <script key={i} src={src}></script>) }
    </body>
    </html>
  );
}

Injector.prototype.inject = function(assetsByChunkName) {
  const chunks = this.chunkNames.reduce((chunks, name) => {
    if (typeof assetsByChunkName[name] === 'string') {
      chunks.js.push(`${this.finalPath}${assetsByChunkName[name]}`);
      return chunks;
    }

    const jsFile = assetsByChunkName[name].find(filename => filename.match(/\.js$/));
    if (jsFile) {
      chunks.js.push(`${this.finalPath}${jsFile}`);
    }

    const cssFile = assetsByChunkName[name].find(filename => filename.match(/\.css$/));
    if (cssFile) {
      chunks.css.push(`${this.finalPath}${cssFile}`);
    }

    return chunks;
  }, { js: [], css: []});

  const markup = ReactDOMServer.renderToStaticMarkup(<Html chunks={chunks} />);
  return `<!DOCTYPE html>${markup}`;
}

export default Injector;
