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
      template: 'template.pug',
      filename: 'layout.pug',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      template: 'template2.pug',
      filename: 'layout2.pug',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: 'template2-tab.pug',
      filename: 'layout2-tab.pug',
      inject: 'body'
    }),
    new HtmlWebpackPugPlugin()
  ]
};
