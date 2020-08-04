/*
 * @Description: 生产环境
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-31 10:08:09
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-04 15:10:43
 */ 

const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin') ;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');




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
    new BundleAnalyzerPlugin(),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  optimization : {
    minimize: true,
    minimizer : [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          // Added for profiling in devtools
          // keep_classnames: isEnvProductionProfile,
          // keep_fnames: isEnvProductionProfile,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g , 
        cssProcessor: require("cssnano"), //用于压缩和优化CSS 的处理器，默认是 cssnano
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll:true } }]
        },
        canPrint: true
      })
    ],
    splitChunks : {
      chunks: "all" ,
      minSize: 30000 ,
      maxSize: 0 ,
      minChunks: 1 ,
      cacheGroups: {
      //   framework: {
      //     test: "framework" ,
      //     name: "framework" ,
      //     enforce: true
      //   },
        vendors: {
          priority: -10 ,
          test: /node_modules/,
          name : "vendor" ,
          enforce: true,
        }

      },
    }
  }
});
