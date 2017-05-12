var path = require('path');
var AppCachePlugin = require('appcache-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('../..');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackMajorVersion = require('webpack/package.json').version.split('.')[0];

module.exports = {
  entry: './example.js',
  output: {
    path: path.join(__dirname, 'dist/webpack-' + webpackMajorVersion),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.html$/, loader: 'html-loader?-removeOptionalTags' }
    ]
  },
  plugins: [
    new AppCachePlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: '_template.pug',
      filename: 'index.pug',
      filetype: 'pug'
    }),
    new HtmlWebpackPlugin({
      template: '_template.slim',
      filename: 'index.slim',
      filetype: 'slim'
    }),
    new HtmlWebpackPlugin({
      template: '_template.haml',
      filename: 'index.haml',
      filetype: 'haml'
    }),
    new HtmlWebpackPugPlugin()
  ]
};
