/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-08-04 14:35:16
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-04 15:10:02
 */ 
module.exports = {
  plugins: [
    require('autoprefixer')({ overrideBrowserslist: ['last 5 version', '>1%', 'ie >=8'] })
  ]
};
