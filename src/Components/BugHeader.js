import React, { Component } from 'react';
import { Row, Col } from 'antd'; 

import "antd/dist/antd.css";
import "./css/components.css"

import BugNet from '../Assets/resolved/bugnet'

export default class BugHeader extends Component {



    phone = () => {
        return(
            <div className="BugHeaderContainer fade-in">
                <div className="Row1">
                    <BugNet/>
                </div>
                <div className="Row2">
                    <div><strong>CATCHING BUGS</strong></div>
                </div>
            </div>
        )
    }

    touchpad = () => {
        return this.laptop()
    }

    laptop = () => {
        return(
            <Row className="BugHeaderContainer fade-in">
                <Col className="BugNetCol" span={4} offset={3}>
                    <BugNet/>
                </Col>
                <Col className="TitleCol" span={12} offset={4}>
                    <div className="title"><strong>CATCHING BUGS</strong></div>
                </Col>
            </Row>
        )
    }

    view = () => {
        if(this.props.isPhone){
            return this.phone()
        } else if(this.props.touchpad){
            return this.touchpad()
        }else{
            return this.laptop()
        }
    }


    render() {

        return(this.view())
    }
}
