var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('../..');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.png$/i, type: 'asset/resource' }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
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
