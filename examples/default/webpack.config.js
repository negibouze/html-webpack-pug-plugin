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
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      filetype: 'pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'output.pug'
    }),
    new HtmlWebpackPlugin({
      filetype: 'jade'
    }),
    new HtmlWebpackPlugin({
      filename: 'output.jade'
    }),
    new HtmlWebpackPugPlugin()
  ]
};

