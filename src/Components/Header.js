import React from 'react';
import { Link } from "react-router-dom"
import { Avatar, Menu, Dropdown} from 'antd';
import { BugOutlined, StockOutlined, UserOutlined  } from '@ant-design/icons'; 

import "antd/dist/antd.css";
import './css/components.css'

import NamedLogo from '../Assets/resolved/namedLogo'
import Hamburger from '../Assets/resolved/hamburger'


export default function Header({avatar, media}){

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
              {
                avatar === ""
                ?
                <Avatar icon={<UserOutlined />} />
                :
                <Avatar key={avatar} shape="square" size={24} src={avatar}/>
              }
            <div className="text">Profile</div>
          </div>
        </Link>
      </Menu.Item>
    </Menu>
  );


  let phone = () => {
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

  let touchpad = () => {
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

  let laptop = () => {
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
                {
                  avatar === ""
                  ?
                  <Avatar size={64} icon={<UserOutlined />} />
                  :
                  <Avatar key={avatar} shape="square" size={64} src={avatar}/>
                }
                
            </Link>
          </div> 
        </div>
      </div>
    )
  }

  let view = () => {
    if(media === "phone"){
        return phone()
    } else if(media === "touchpad"){
        return touchpad()
    }else{
        return laptop()
    }
  }

  return(view())
}