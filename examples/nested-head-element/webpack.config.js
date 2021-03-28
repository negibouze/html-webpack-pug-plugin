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
      template: 'template.pug',
      filename: 'layout.pug',
      inject: 'head',
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: 'template2.pug',
      filename: 'layout2.pug',
      inject: 'body',
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: 'template2-tab.pug',
      filename: 'layout2-tab.pug',
      inject: 'body',
      minify: false
    }),
    new HtmlWebpackPugPlugin({
      adjustIndent: true
    })
  ]
};
