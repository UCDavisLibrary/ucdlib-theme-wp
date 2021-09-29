const path = require('path');
const fs = require('fs-extra');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let preview = '../static/public-js';
let previewFolder = path.join(__dirname, preview);
if( fs.existsSync(previewFolder) ) {
  fs.removeSync(previewFolder);
}

let config = require('@ucd-lib/cork-app-build').watch({
  // root directory, all paths below will be relative to root
  root : __dirname,
  // path to your entry .js file
  entry : './index.js',
  // folder where bundle.js will be written
  preview : preview,
  clientModules : 'node_modules'
});

module.exports = config;