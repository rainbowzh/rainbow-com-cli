/*
 * @Description: 公共配置文件(webpack 配置是标准的 Node.js的CommonJS 模块，它通过require来引入其他模块，通过module.exports导出模块，由 webpack 根据对象定义的属性进行解析。)
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-31 10:00:33
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-31 15:32:20
 */ 
const path = require('path') ;

module.exports = {
  entry : {
    index : "./src/index.js" ,//入口文件
    framework : ['react','react-dom']
  },
  output:{
    filename : "js/bundle.js" ,
    path : path.resolve(__dirname, '../dist') ,
  },
  module : {
    rules: [
      {
        test: /\.(js|jsx)$/ ,
        use : "babel-loader" ,
        exclude : /node_modules/
      }
    ]
  }

}