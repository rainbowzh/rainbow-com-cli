/*
 * @Description: 生产环境
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-31 10:08:09
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-31 17:55:43
 */ 

const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin') ;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');




module.exports = merge(common, {
  mode: 'production', 
  output: {
    filename: 'js/[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          MiniCssExtractPlugin.loader,
          'css-loader' ,
          'postcss-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins : [
    new HtmlWebpackPlugin({
      filename : 'index.html' ,
      template : 'public/index.html' ,
      inject : 'body' , //在body最底部引入js
      minify : {//压缩html
        removeComments : true , //去除注释
        collapseWhitespace : true ,//去除空格
      }
    }) ,
    new CleanWebpackPlugin() ,
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].css',
    }),
  ],
  optimization : {
    splitChunks : {
      chunks: "initial" ,
      minSize: 30000 ,
      maxSize: 0 ,
      minChunks: 1 ,
      cacheGroups: {
        framework: {
          test: "framework" ,
          name: "framework" ,
          enforce: true
        },
        vendors: {
          priority: -10 ,
          test: /node_modules/,
          name : "vendor" ,
          enforce: true,
        }
        // vendors: {
        //   priority: -10 ,
        //   test: "framework",
        //   name : "vendor" ,
        //   enforce: true,
        // }

      }
    },
    minimizer : [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g , 
        cssProcessor: require("cssnano"), //用于压缩和优化CSS 的处理器，默认是 cssnano
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll:true } }]
        },
        canPrint: true
      })
    ]
  }
});
