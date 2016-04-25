const path = require('path');

module.exports = {
  // remember to modify `clean` and `postbuild` task in package.json
  buildDir: path.join(__dirname, 'dist'),
  assertsPath: '/assets/'
};
