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
      { test: /\.png$/i, type: 'asset/resource' },
      { test: /\.html$/i, loader: 'html-loader' }
    ]
  },
  devtool: 'eval',
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'template-html.js',
      title: 'javascript advanced example'
    }),
    new HtmlWebpackPlugin({
      template: 'template-pug.js',
      title: 'javascript advanced example',
      filename: 'index.pug'
    }),
    new HtmlWebpackPugPlugin({
      adjustIndent: true
    })
  ]
};
