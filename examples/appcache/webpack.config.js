var path = require('path');
var AppCachePlugin = require('appcache-webpack-plugin');
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
      { test: /\.png$/i, type: 'asset/resource' },
      { test: /\.html$/i, loader: 'html-loader' }
    ]
  },
  plugins: [
    new AppCachePlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'template.html'
    }),
    new HtmlWebpackPlugin({
      template: 'template.pug',
      filename: 'index.pug',
      minify: false
    }),
    new HtmlWebpackPugPlugin()
  ]
};
