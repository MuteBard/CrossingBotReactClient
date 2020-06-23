import React, { Component } from 'react';
import { Row, Col, Card, Button, Statistic, Progress} from 'antd'; 
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import PocketBug from '../Assets/resolved/bugIcon'
import "antd/dist/antd.css";
import "./css/components.css"
import time from "../Cron/Timing"

const CATCH = "catch"
const BUG = "bug"
const SELLALL = "sellall"
const cardHeaderStyle = {width: 470, textAlign : "center", color : "#2A5D67", backgroundColor : "#4AE3B5", fontSize : "25px" }
const cardBodyStyle = { width: 470, textAlign : "center", color : "#4AE3B5", backgroundColor : "#2A5D67", fontSize : "15px" }


export default class BugBody extends Component{
    state = {
        seconds : 0,
    }

    componentDidMount = () => {
        let lsSeconds = localStorage.getItem('bugSeconds')
        let lsTimeStamp = localStorage.getItem('bugTimeStamp')
        localStorage.clear();
        if(lsSeconds > 0){
            let oldTime = lsTimeStamp
            let currTime = parseInt(new Date().getTime() / 1000)
            let timeAway = currTime - oldTime
            let secondsRemaining = lsSeconds - timeAway
            this.setState({seconds: secondsRemaining})
            setTimeout(() => {
                if(this.state.seconds > 0){
                    this.bugIsLocked() 
                }  
            }, 100);
        }else{
            this.setState({seconds: 0})
        }
    }

    statistic(base, current, unit, arrow, isPhone) {
        let fontSize = 25
        if (isPhone){
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
  
    bugIsLocked = () =>{
        let seconds = this.state.seconds
        let intervalId = setInterval(() => {  
            if(seconds > 0){
                this.persistSeconds(seconds, true)
                seconds--
            } else{
                this.persistSeconds(seconds, false)
                clearInterval(intervalId);
            }
        }, 1000);
    }
  
    persistSeconds = (seconds, persist) => {
        if(persist){
            var timestamp = parseInt(new Date().getTime() / 1000)
            this.setState({seconds})
            localStorage.setItem('bugSeconds', seconds);
            localStorage.setItem('bugTimeStamp', timestamp);
        }else{    
            this.setState({seconds})
            localStorage.clear();
        }
    }


    phone = ({
        name,
        bells,
        rarity,
        img,
        availability,
        pocketBugs,
        userBells,
        handleClick,
        isPhone,
        percentProgress,
        displayseconds
    }) => {
        const cardHeaderStyle = {width: 300, textAlign : "center", color : "#2A5D67", backgroundColor : "#4AE3B5",  fontSize : "19px" }
        const cardBodyStyle = { width: 300, textAlign : "center", color : "#4AE3B5", backgroundColor : "#2A5D67", fontSize : "15px" }
        return(
            <div className="BugBodyContainer fade-in">
                <div className="Row1">
                    {
                        this.state.seconds === 0 
                        ?
                        <Card className="fade-in">
                            <Button type="primary" block onClick={() => {
                                this.setState({seconds : 60})
                                setTimeout(() => {
                                    this.bugIsLocked() 
                                }, 100);
                                return handleClick(CATCH,BUG) 
                            }}>
                                Catch a Bug
                            </Button>
                        </Card>
                        :
                        <div className="timer">
                            <Progress type="circle" percent={percentProgress} strokeColor={"#4AE3B5"} format={percent => `${displayseconds} sec`} />
                        </div>
                    }
                </div>
                <div className="Row2">
                    <Card className="card">
                        <div className="stats2">
                            <div>{this.statistic(0, userBells, "bells", false, isPhone)}</div>
                        </div>
                    </Card>
                </div>
                <div className="Row3">
                    <PocketBug traits={{name,bells,rarity,img,availability}} isPhone={true}/> 
                </div>
                <div className="Row4">
                {
                    name !== "" 
                    ?
                    <div className="fade-in">
                        <Card title={name.toUpperCase()} bordered={false} headStyle={cardHeaderStyle} bodyStyle={cardBodyStyle}>
                            <p>You have caught a {name}!</p>
                            <p>Bells: {bells}</p>
                            <p>Rarity Level: {rarity}</p>
                            <p>Availability: {availability.map(month => `${time.interpretMonth(month)}, `)}</p>
                        </Card>
                    </div>
                    :
                    null
                }  
                </div>
                <div className="Row5">                    
                    {
                        pocketBugs.length > 0
                    ? 
                        <div>
                            <p className="PocketColTitle">Your Pocket</p>
                            <Card style={{ width: 300, backgroundColor : "#EEEEEE" }}>
                                {pocketBugs.map((data, idx) => <PocketBug key = {idx} handlePocketClick={handleClick} traits={{name : data.name, img : data.img, bells: data.bells, rarity: data.rarity, availability : data.availability, hover: data.hover, small: data.small}}/>)}
                            </Card>
                        </div>
                    :
                        <Card style={{ width: 300, backgroundColor : "#EEEEEE" }}>
                            <p className="PocketColTitle">Your Pocket is Empty</p>
                        </Card>
                    }
                </div>

                <div className="Row6">
                    {
                        pocketBugs.length > 0
                    ? 
                        <Card>
                            <Button type="primary" block onClick={() => {handleClick(SELLALL,BUG)}}>
                                Sell All Bugs
                            </Button>
                        </Card>
                    :
                        null
                    }
                </div>
                <div className="Row7">
                </div>
            </div>
        )
    }
    touchpad = (variables) => {
        return (this.laptop(variables))
    }
    laptop = ({
        name,
        bells,
        rarity,
        img,
        availability,
        pocketBugs,
        userBells,
        handleClick,
        percentProgress,
        displayseconds
    }) => {
        return( 
            <div>
                <Row className="BugBodyContainer fade-in">
                    <Col className="BugNetCol" span={5} offset={2}> 
                        <Card className="card">
                            <div className="stats2">
                                <strong>Bells Earned</strong>
                                <div>{this.statistic(0, userBells, "bells", false)}</div>
                            </div>
                        </Card>
                        {this.state.seconds === 0 
                        ?
                        <Card className="fade-in">
                            <Button type="primary" block onClick={() => {
                                this.setState({seconds : 60})
                                setTimeout(() => {
                                    this.bugIsLocked() 
                                }, 100);
                                return handleClick(CATCH,BUG) 
                            }}>
                                Catch a Bug
                            </Button>
                        </Card>
                        :
                        <div className="timer">
                            <Progress type="circle" percent={percentProgress} strokeColor={"#4AE3B5"} format={percent => `${displayseconds} sec`} />
                        </div>
                    }
                    </Col>
                    <Col span={10} offset={4}>
                        {name !== "" 
                            ?
                            <div className="fade-in">
                                <Card title={name.toUpperCase()} bordered={false} headStyle={cardHeaderStyle} bodyStyle={cardBodyStyle}>
                                    <p>You have caught a {name}!</p>
                                    <p>Bells: {bells}</p>
                                    <p>Rarity Level: {rarity}</p>
                                    <p>Availability: {availability.map(month => `${time.interpretMonth(month)}, `)}</p>
                                </Card>
                            </div>
                            :
                            null
                        }
                    </Col>
                </Row>
                {
                    pocketBugs !== []
                    ? 
                    <div>
                        <Row className="PocketContainer">
                            <Col className="PocketCol" span={20} offset={2}>
                                
                                {
                                    pocketBugs.length > 0
                                ? 
                                    <div>
                                        <p className="PocketColTitle">Your Pocket</p>
                                        <Card>
                                            {pocketBugs.map((data, idx) => <PocketBug key={idx}  handlePocketClick={handleClick} traits={{name : data.name, image : data.img, bells: data.bells, rarity: data.rarity, availability : data.availability, hover: data.hover, small: data.small}}/>)}
                                        </Card>
                                    </div>
                                :
                                    <p className="PocketColTitle">Your Pocket is Empty</p>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5} offset={2}>
                                <div className="sellAllCard">
                                {
                                    pocketBugs.length > 0
                                ? 
                                    <Card>
                                        <Button type="primary" block onClick={() => {handleClick(SELLALL,BUG)}}>
                                            Sell All Bugs
                                        </Button>
                                    </Card>
                                :
                                    null
                                }

                                </div>
                            </Col>
                        </Row>
                    </div>
                    :
                    null
                }
            </div>
        )
    }

    view = () => {
        let { name, bells, img, rarity, availability, pocketBugs, userBells} = this.props.data
        let { handleClick, isPhone, isTouchpad } = this.props 
        let percentProgress = parseInt(100 * (60 - this.state.seconds) / 60)
        let displayseconds = this.state.seconds

        let variables = {
            name,
            bells,
            rarity,
            img,
            availability,
            isPhone,
            pocketBugs,
            userBells,
            handleClick,
            percentProgress,
            displayseconds
        }

        if(isPhone){
          return this.phone(variables)
        } else if(isTouchpad){
          return this.touchpad(variables)
        }else{
          return this.laptop(variables)
        }
    }
    
    render(){
        return(this.view())
    }
} 