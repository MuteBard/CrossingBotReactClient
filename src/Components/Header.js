import React from 'react';
import { Link } from "react-router-dom"
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import { BugOutlined, StockOutlined } from '@ant-design/icons'; 
import "antd/dist/antd.css";
import './css/components.css'

import NamedLogo from '../Assets/resolved/namedLogo'
import Hamburger from '../Assets/resolved/hamburger'


export default function Header({state}){


  let isPhone = () =>{
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    return vw < 767
  }

  let isTouchPad = () =>{
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    return vw <= 1024 && vw >= 768
  }


  let dynamicColumns = () => {
    if(true){
      return (
        <>

        </>
      )
    }else{
      return (
        null
      )
    }
  }

  console.log(state)


  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to='/catch'>
          <div className="MenuItem">
            <BugOutlined style={{fontSize:"1.5em", color:"#2A5D67"}}/>
            <div className="text">Catch</div>
            
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to='/market'>
          <div className="MenuItem">
            <StockOutlined style={{fontSize:"1.5em", color:"#2A5D67"}}/>
            <div className="text">Market</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Link to='/profile'>
          <div className="MenuItem">
            <Avatar shape="square" size={24} src={state.avatar}/>
            <div className="text">Profile</div>
          </div>
        </Link>
      </Menu.Item>
    </Menu>
  );


  let mobile = () => {
    return(
      <div className="Header">
        <div className="Row1">
          <div className="Col1">
            <Link to='/'>
              <NamedLogo/>
            </Link>
          </div>
          <div className="Col2">
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="/">
                <Hamburger/>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    )
  }

  let touchPad = () => {
    return(
      <div className="Header">
        <div className="Row1">
          <div className="Col1">
            <Link to='/'>
              <NamedLogo/>
            </Link>
          </div>
          <div className="Col2">
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="/">
                <Hamburger/>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    )
  } 

  let desktop = () => {
    return(
      <div className="Header">
        <div className="Row1">
          <div className="Col1">
            <Link to='/'>
              <NamedLogo/>
            </Link>
          </div>
          <div className="Col2">
            <Link to='/catch'>
              <div className="item1">Catch</div>
              <BugOutlined style={{fontSize:"3em", color:"#2A5D67"}}/>
            </Link>
          </div>
          <div className="Col3">
            <Link to='/market'>
              <div className="item1">Market</div>
              <StockOutlined style={{fontSize:"3em", color:"#2A5D67"}}/>
            </Link>
          </div>
          <div className="Col4">
            <Link to='/profile'>
                <Avatar shape="square" size={64} src={state.avatar}/>
            </Link>
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



{/* <Row className = "Header" align="middle">
<Col span={6}>
  <Link to='/'>
    <NamedLogo/>
  </Link>
</Col>
{
  state.authorized 
  ?
  <>
    <Col className="headerItem" span={3} offset={8}>
      <Link className="linkWrap" to='/catch'>
        <div class="headerText">Catch</div>
        <BugOutlined style={{fontSize:"3em", color:"#2A5D67"}}/>
      </Link>
    </Col>
    <Col className="headerItem" span={3}>
      <Link className="linkWrap" to='/market'>
        <div class="headerText">Market</div>
        <StockOutlined style={{fontSize:"3em", color:"#2A5D67"}}/>
      </Link>
    </Col>
    <Col className="headerProfile" span={3} offset={1}>
      <Link className="linkWrap" to='/profile'>
          <Avatar shape="square" size={64} src={state.avatar} />
      </Link>
    </Col> 
  </>
  :
  null
}
</Row> */}