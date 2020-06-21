import React from 'react'; 
import "antd/dist/antd.css";

import {
  TwitterOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
 
export default function Footer(){

  let isPhone = () =>{
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    return vw < 767
  }

  let isTouchPad = () =>{
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    return vw <= 1024 && vw >= 768
  }

  let mobile = () => {
    return(
    <div className = "Footer">
      <div className="Row1">
        <div className="Col1">
          <div className="Item1">Issues?</div>
          <div className="Item2"><a href='https://twitter.com/MutinyBard'><TwitterOutlined className="icon" style={{fontSize:"1.5em", color:"#4AE3B5"}}/></a></div>
        </div>
        <div className="Col2">
          <div className="Item1">Donate</div>
          <div className="Item2"><a href='https://paypal.me/MuteBard'><DollarCircleOutlined className="icon" style={{fontSize:"1.5em", color:"#4AE3B5"}}/></a></div>
        </div>
      </div>
    </div>
    )
  }

  let touchPad = () => {
    return(
    <div className = "Footer">
      <div className="Row1">
        <div className="Col1">
          <div className="Item1">Issues?</div>
          <div className="Item2"><a href='https://twitter.com/MutinyBard'><TwitterOutlined className="icon" style={{fontSize:"3em", color:"#4AE3B5"}}/></a></div>
        </div>
        <div className="Col2">
          <div className="Item1">Donate</div>
          <div className="Item2"><a href='https://paypal.me/MuteBard'><DollarCircleOutlined className="icon" style={{fontSize:"3em", color:"#4AE3B5"}}/></a></div>
        </div>
      </div>
    </div>
    )
  }

  let desktop = () => {
    return(
    <div className = "Footer">
      <div className="Row1">
        <div className="Col1">
          <div className="Item1">Issues?</div>
          <div className="Item2"><a href='https://twitter.com/MutinyBard'><TwitterOutlined className="icon" style={{fontSize:"3em", color:"#4AE3B5"}}/></a></div>
        </div>
        <div className="Col2">
          <div className="Item1">Donate</div>
          <div className="Item2"><a href='https://paypal.me/MuteBard'><DollarCircleOutlined className="icon" style={{fontSize:"3em", color:"#4AE3B5"}}/></a></div>
        </div>
      </div>
    </div>
    )
  }

  let view = () => {
    if(isPhone()){
      return mobile() 
    } else if(isTouchPad()){
      return touchPad()
    }else{
      return desktop()
    }
  }

  return(view())
}

