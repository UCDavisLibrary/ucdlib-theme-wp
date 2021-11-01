const path = require('path');
const fs = require('fs-extra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let preview = '../../assets/js/public';
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

let loaderOptions = {
  css: {
    loader: 'css-loader',
    options : {
      url: false
    }
  },
  scss: {
    loader: 'sass-loader',
    options: {
      implementation: require("sass"),
      sassOptions: {
        includePaths: [
          "node_modules/@ucd-lib/theme-sass",
          "node_modules/breakpoint-sass/stylesheets",
          "node_modules/sass-toolkit/stylesheets"]
      }
    }
  }
}
if( !Array.isArray(config) ) config = [config];
config.forEach(conf => {
  
  // make stylesheet
  conf.entry = [conf.entry, path.join(__dirname, './scss/style.scss')];
  conf.module.rules.push({
     test: /\.s[ac]ss$/i,
     use: [
       { loader: MiniCssExtractPlugin.loader},
       loaderOptions.css,
       loaderOptions.scss,
     ]
   });

   conf.plugins = [
     new MiniCssExtractPlugin({
       filename: '../../css/ucd-styles.css'
     })
   ]
});

module.exports = config;