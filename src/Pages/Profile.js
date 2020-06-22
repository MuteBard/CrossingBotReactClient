import React, { Component } from 'react';
import { Row, Col, Statistic, Button, Card} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import * as Route from '../Actions/Route';    

import "antd/dist/antd.css";
import "./css/pages.css" 

// import Loading from './Loading'
import Bells from '../Assets/resolved/bells'
import Turnip from '../Assets/resolved/turnip'
import BugNet from '../Assets/resolved/bugnet'
import FishRod from '../Assets/resolved/fishrod'
import Logo2 from '../Assets/resolved/logo2'

export default class Catch extends Component {
    state = {
        username: this.props.state.username,
        avatar : this.props.state.avatar,
        quantity : 0,
        netGainLossAsBells: 0,
        netGainLossAsPercentage : 0,
        userbells : 0,
        pocketBugs : [],
        pocketFishes : [],
        addedToChannel : true,
      };


    componentDidMount = () => {
        this.updateData()
    }

    toggleCrossingBot(value){
        let updateUserChannelWithCrossingBot = (data) => {
          if (data.isCrossingBotAdded === "Success"){
            this.setState({
                addedToChannel : value
            })
          }
        }

        let CBAS_Payload = {username : this.state.username , addedToChannel : value}        
        Route.mutateCBforUser(CBAS_Payload, updateUserChannelWithCrossingBot)
      }

    updateData = () => {
        let setCatchPocketData = (data) =>{
            this.setState({
                quantity : data.getUser.liveTurnips.quantity,
                netGainLossAsBells: data.getUser.liveTurnips.netGainLossAsBells,
                netGainLossAsPercentage : data.getUser.liveTurnips.netGainLossAsPercentage,
                userbells : data.getUser.bells,
                pocketBugs : data.getUser.pocket.bug,
                pocketFishes : data.getUser.pocket.fish,
            })
        }

        let CBAS_Payload = { username: this.state.username}
        Route.queryProfileUserData(CBAS_Payload, setCatchPocketData)
    }

    statistic(base, current, unit, arrow) {
        let fontSize = 25
        if (this.props.state.media === "phone"){
            fontSize = 17
        }

        return (
            current >= base ?
            <Statistic
                value={current}
                precision={0}
                valueStyle={{ color: '#4AE3B5', fontSize : fontSize }}
                prefix={ arrow ? <ArrowUpOutlined/> : undefined }
                suffix={ unit !== undefined ? unit : undefined }
            /> 
            :
            <Statistic
                value={current}
                precision={0}
                valueStyle={{ color: '#E34A78', fontSize : fontSize }}
                prefix={ arrow ? <ArrowDownOutlined/> : undefined }
                suffix={ unit !== undefined ? unit : undefined}
             /> 
        )
    }

    isPhone = () => {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        return vw < 767
      }
    
    isTouchpad = () => {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        return vw <= 1024 && vw >= 768
    }

    phone = () => {
        return (
            <div className="ProfileContainer">
                <div className="Row1">
                    <div className="Item1">
                        <img alt="example" className="profilePicture" src={this.state.avatar}/> 
                    </div>
                    <div className="Item2">
                        <strong>{this.state.username}</strong>
                    </div>
                </div>
                <div className="Row2">
                    <div className="Item1">
                        <div><strong>Turnips Held</strong></div>
                        <div>{this.statistic(0, this.state.quantity, "turnip(s)", false)}</div>
                    </div>
                    <div className="Item2">
                        <div><strong>Today's Return</strong></div>
                        <div>{this.statistic(0, this.state.netGainLossAsBells, "bells", true)}</div>
                    </div>
                    <div className="Item3">
                        <div><strong>Overall Return</strong></div>
                        <div>{this.statistic(0, this.state.netGainLossAsPercentage, "%", true)}</div>
                    </div>
                </div>
                <div className="Row3">
                    <div className="Item1">
                        <div><strong>Bells Owned</strong></div>
                        <div>{this.statistic(0, this.state.userbells, "bells", false)}</div>
                    </div>
                </div>
                <div className="Row4">
                    <div className="Item1">
                        <div><strong>Bugs Owned ({this.state.pocketBugs.length}/10)</strong></div>
                        <Card style={{ width: 300, backgroundColor : "#EEEEEE" }}>
                            {this.state.pocketBugs.map((bug, idx) => <img key={idx} className="phoneSizeImg" alt={bug.name} src={bug.img}/>)}
                        </Card>
                    </div>
                </div>
                <div className="Row5">
                    <div className="Item1">
                        <div><strong>Fishes Owned ({this.state.pocketFishes.length}/10)</strong></div>
                        <Card style={{ width: 300, backgroundColor : "#EEEEEE" }}>
                            {this.state.pocketFishes.map((fish, idx) => <img key={idx} className="phoneSizeImg" alt={fish.name} src={fish.img}/>)}
                        </Card>
                    </div>
                </div>
                <div className="Row6">
                    <div className="Item1">
                        <div><strong>Actions for Your Twitch Channel</strong></div>  
                        {this.state.addedToChannel === true ? <Button type="primary" onClick={() => this.toggleCrossingBot(false)}>Turn Off CrossingBot</Button> : <Button type="primary" onClick={() => this.toggleCrossingBot(true)}>Turn On CrossingBot</Button> }
                    </div>
                </div>               
            </div>
        )
    }

    touchpad = () => {
        return this.laptop()
    }

    laptop = () => {
        return( 
            <div className="ProfileContainer">
                <Row className="row" align="middle">
                    <Col span={5} offset={1}>
                        <img alt="example" className="profilePicture" src={this.state.avatar}/>    
                    </Col>
                    <Col span={15} offset={3}>
                        <div className="UsernameText">
                            <strong>{this.state.username}</strong>
                        </div>
                    </Col>
                </Row>
                
                <Row className="row" align="middle">
                    <Col offset={1}>
                        <Turnip profile={true}/>
                    </Col>
                    <Col span={5} offset={2}>
                        <div><strong>Turnips Held</strong></div>
                        <div>{this.statistic(0, this.state.quantity, "turnip(s)", false)}</div>
                    </Col>
                    <Col span={5} offset={1}>
                        <div><strong>Today's Return</strong></div>
                        <div>{this.statistic(0, this.state.netGainLossAsBells, "bells", true)}</div>
                    </Col>
                    <Col span={5} offset={1}>
                        <div><strong>Overall Return</strong></div>
                        <div>{this.statistic(0, this.state.netGainLossAsPercentage, "%", true)}</div>
                    </Col>
                </Row>
                
                <Row className="row" align="middle">
                    <Col offset={1}>
                        <Bells profile={true}/>
                    </Col>
                    <Col span={5} offset={2}>
                        <p className="itemTitle"><strong>Bells Earned</strong></p>
                        <div>{this.statistic(0, this.state.userbells, "bells", false)}</div>
                    </Col>
                </Row>
                
                <Row className="row" align="middle">
                    <Col offset={1}>
                        <BugNet profile={true}/>
                    </Col>
                    <Col span={15} offset={2}>
                        <p className="itemTitle"><strong>Bugs Owned ({this.state.pocketBugs.length}/10)</strong></p>
                        {this.state.pocketBugs.map(bug => <img alt={bug.name} src={bug.img}/>)}
                    </Col>
                </Row>
                
                <Row className="row" align="middle">
                    <Col offset={1}>
                        <FishRod profile={true}/>
                    </Col>
                    <Col span={15} offset={2}>
                        <p className="itemTitle"><strong>Fishes Owned ({this.state.pocketFishes.length}/10)</strong></p>
                        {this.state.pocketFishes.map(fish => <img alt={fish.name} src={fish.img}/>)}
                    </Col>
                </Row>

                <Row className="row" align="middle">
                    <Col offset={1}>
                        <Logo2 stopped={!this.state.addedToChannel}/>
                    </Col>
                    <Col span={6} offset={2}> 
                        <p className="itemTitle"><strong>Actions for Your Twitch Channel</strong></p>  
                        {this.state.addedToChannel === true ? <Button type="primary" onClick={() => this.toggleCrossingBot(false)}>Turn Off CrossingBot</Button> : <Button type="primary" onClick={() => this.toggleCrossingBot(true)}>Turn On CrossingBot</Button> }
                    </Col>
                </Row>
            </div> 
        )
    }

    view = () => {
        let { media } = this.props.state
        if(media === "phone"){
            return this.phone()
        } else if(media === "touchpad"){
            return this.touchpad()
        }else{
            return this.laptop()
        }
    }


    render() {
        return this.view()
    }
}

