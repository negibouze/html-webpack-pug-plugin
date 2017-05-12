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
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  devtool: 'eval',
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: '_pug.js',
      filename: 'index.pug',
      filetype: 'pug'
    }),
    new HtmlWebpackPlugin({
      template: '_slim.js',
      filename: 'index.slim',
      filetype: 'slim'
    }),
    new HtmlWebpackPlugin({
      template: '_haml.js',
      filename: 'index.haml',
      filetype: 'haml'
    }),
    new HtmlWebpackPugPlugin()
  ]
};
