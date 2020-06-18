import React from 'react';
import { Link } from "react-router-dom"
import { Row, Col, Avatar} from 'antd';
import { BugOutlined, StockOutlined } from '@ant-design/icons'; 
import "antd/dist/antd.css";
import './css/components.css'

import NamedLogo from '../Assets/resolved/namedLogo'

export default function Header({state}){


  console.log(state)
  return(
      <Row className = "Header" align="middle">
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
      </Row>
  )
}
