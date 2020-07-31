/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-31 10:04:24
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-31 17:00:18
 */
import React from 'react';
import './app.scss';



function App() {
  const a = function() {
    return [1,2,3];
  }();

  a.includes(3);
  return (
    <div className="App">Hello World ,99999</div>
  );
}

export default App;
