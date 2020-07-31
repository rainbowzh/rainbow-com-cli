/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-31 10:08:23
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-31 17:26:55
 */ 
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          'style-loader',
          'css-loader' ,
          'postcss-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    port: 8000,
    compress: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
