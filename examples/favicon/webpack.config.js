var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('../..');
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
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test: /\.png$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      favicon: 'favicon.ico',
      template: '_template.html'
    }),
    new HtmlWebpackPlugin({
      favicon: 'favicon.ico',
      template: '_template.pug',
      filename: 'index.pug',
      filetype: 'pug'
    }),
    new HtmlWebpackPlugin({
      favicon: 'favicon.ico',
      template: '_template.slim',
      filename: 'index.slim',
      filetype: 'slim'
    }),
    new HtmlWebpackPlugin({
      favicon: 'favicon.ico',
      template: '_template.haml',
      filename: 'index.haml',
      filetype: 'haml'
    }),
    new HtmlWebpackPugPlugin()
  ]
};
