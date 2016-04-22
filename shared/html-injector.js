'use strict';

const fs = require('fs');

function Injector(htmlFilePath, publicPath, chunkNames) {
  this.htmlFilePath = htmlFilePath;
  this.finalPath = publicPath || '/';
  this.chunkNames = chunkNames;
}

Injector.prototype.inject = function(assetsByChunkName) {
  const html = fs.readFileSync(this.htmlFilePath).toString();

  const files = this.chunkNames.reduce((files, name) => {
    const jsFile = assetsByChunkName[name].find(filename => filename.match(/\.js$/));
    if (jsFile) {
      files.js += `<script src="${this.finalPath}${jsFile}"></script>`;
    }

    const cssFile = assetsByChunkName[name].find(filename => filename.match(/\.css$/));
    if (cssFile) {
      files.css += `<link rel="stylesheet" href="${this.finalPath}${cssFile}">`;
    }

    return files;
  }, { js: '', css: ''});

  return html.replace('</body>', `${files.js}</body>`).replace('</head>', `${files.css}</head>`);
}

module.exports = Injector;
