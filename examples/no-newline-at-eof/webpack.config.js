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
      title: 'HtmlWebpackPlugin example',
      template: 'template.pug',
      filename: 'index.pug'
    }),
    new HtmlWebpackPlugin({
      title: 'HtmlWebpackPlugin example',
      template: 'template-tab.pug',
      filename: 'index-tab.pug'
    }),
    new HtmlWebpackPugPlugin()
  ]
};
