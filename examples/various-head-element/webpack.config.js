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
    rules: [
      { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test: /\.png$/, use: 'file-loader' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: 'template1.pug',
      filename: 'index1.pug'
    }),
    new HtmlWebpackPlugin({
      template: 'template2.pug',
      filename: 'index2.pug'
    }),
    new HtmlWebpackPlugin({
      template: 'template3.pug',
      filename: 'index3.pug'
    }),
    new HtmlWebpackPlugin({
      template: 'template4.pug',
      filename: 'index4.pug'
    }),
    new HtmlWebpackPugPlugin()
  ]
};
