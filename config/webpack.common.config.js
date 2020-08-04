/*
 * @Description: 公共配置文件(webpack 配置是标准的 Node.js的CommonJS 模块，它通过require来引入其他模块，通过module.exports导出模块，由 webpack 根据对象定义的属性进行解析。)
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-31 10:00:33
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-04 10:32:47
 */ 
const path = require('path') ;

module.exports = {
  entry : {
    index : "./src/index.js" ,//入口文件
    // framework : ['react','react-dom']
  },
  output:{
    filename : "js/bundle.js" ,
    path : path.resolve(__dirname, '../dist') ,
  },
  module : {
    rules: [
      {
        test: /\.(js|jsx)$/ ,
        include: path.resolve(__dirname, "../src"),
        use: ["babel-loader"] ,
        exclude : /node_modules/
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 10000,
          },
        }
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'font/'
          }
        }
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',

}