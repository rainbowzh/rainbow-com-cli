/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-31 10:04:24
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-04 14:04:54
 */
import React from 'react';
import background from './image/background.png';
import { Button } from 'antd' ;
import { cube } from './fun.js' ;
import './app.scss';



function App() {
  console.log([1,2,3].includes(3));
  return (
    <React.Fragment>
      <div className="App">Hello World ,99999</div>
      <img className="background" src={background} alt=""/>
      {
        console.log('333')
      }
      <Button></Button>
    </React.Fragment>
  );
}

export default App;
