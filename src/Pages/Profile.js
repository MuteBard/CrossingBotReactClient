import React, { Component } from 'react';
import { Row, Col, Statistic, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import * as Route from '../Actions/Route';    

import "antd/dist/antd.css";
import "./css/pages.css" 

// import Loading from './Loading'
import LightCog from '../Assets/resolved/backgroundcogLight'
import Bells from '../Assets/resolved/bells'
import Turnip from '../Assets/resolved/turnip'
import BugNet from '../Assets/resolved/bugnet'
import FishRod from '../Assets/resolved/fishrod'
import Logo2 from '../Assets/resolved/logo2'

export default class Catch extends Component {
    state = {
        username : localStorage.getItem('username'),
        avatar : localStorage.getItem('avatar'),
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
        
        return (
            current > base ?
            <Statistic
                value={current}
                precision={0}
                valueStyle={{ color: '#4AE3B5' }}
                prefix={ arrow ? <ArrowUpOutlined/> : undefined }
                suffix={ unit !== undefined ? unit : undefined }
            /> 
            :
            <Statistic
                value={current}
                precision={0}
                valueStyle={{ color: '#E34A78' }}
                prefix={ arrow ? <ArrowDownOutlined/> : undefined }
                suffix={ unit !== undefined ? unit : undefined }
             /> 
        )
    }

    render() {
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

                <LightCog/>             
            </div> 
        )
    }
}

