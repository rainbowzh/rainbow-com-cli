/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-08-04 14:35:16
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-04 16:07:49
 */ 
module.exports = {
  plugins: [
    require('autoprefixer')({ overrideBrowserslist: ['last 5 version', '>1%', 'ie >=8'] }) ,
    require('postcss-pxtorem')({
      rootValue: 75,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*']
    })
  ]
};
