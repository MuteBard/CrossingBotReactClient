import React, { Component } from 'react';
import { Row, Col } from 'antd'; 

import "antd/dist/antd.css";
import "./css/components.css"

import FishRod from '../Assets/resolved/fishrod'

export default class FishHeader extends Component {

    phone = () => {
        return(
            <div className="FishHeaderContainer fade-in">
                <div className="Row1">
                    <FishRod/>
                </div>
                <div className="Row2">
                    <div><strong>CATCHING FISHES</strong></div>
                </div>
            </div>
        )
    }

    touchpad = () => {
        return this.laptop()
    }

    laptop = () => {
        return(
            <Row className="FishHeaderContainer fade-in">
                <Col className="FishRodCol" span={4} offset={3}>
                    <FishRod/>
                </Col>
                <Col className="TitleCol" span={12} offset={4}>
                    <div className="title"><strong>CATCHING FISHES</strong></div> 
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


