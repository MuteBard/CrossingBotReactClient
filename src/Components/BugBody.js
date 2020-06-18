import React, { Component } from 'react';
import { Row, Col, Card, Button, Statistic, Progress} from 'antd'; 
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import PocketBug from '../Assets/resolved/bugIcon'
import "antd/dist/antd.css";
import "./css/components.css"

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
                console.log(this.state.seconds)
                if(this.state.seconds > 0){
                    this.bugIsLocked() 
                }  
            }, 100);
        }else{
            this.setState({seconds: 0})
        }
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

    interpretMonth = month => {
        let result = ""
        switch(month){
            case "JAN":
                result = "January"
                break
            case "FEB":
                result = "Febuary"
                break
            case "MAR":
                result = "March"
                break
            case "APR":
                result = "April"
                break
            case "MAY":
                result = "May"
                break
            case "JUN":
                result = "June"
                break
            case "JUL":
                result = "July"
                break
            case "AUG":
                result = "August"
                break
            case "SEP":
                result = "September"
                break
            case "OCT":
                result = "October"
                break
            case "NOV":
                result = "November"
                break
            case "DEC":
                result = "December"
                break
            default :
                result = "--"   
        }
        return result
    }
    
    render(){
        let { name, bells, rarity, availability, pocketBugs, userBells} = this.props.data
        let { handleClick } = this.props 
        let percentProgress = parseInt(100 * (60 - this.state.seconds) / 60)
        let displayseconds = this.state.seconds
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
                                    <p>Availability: {availability.map(month => `${this.interpretMonth(month)}, `)}</p>
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
                                            {pocketBugs.map(data => <PocketBug handlePocketClick={handleClick} traits={{name : data.name, image : data.img, bells: data.bells, rarity: data.rarity, availability : data.availability, hover: data.hover, small: data.small}}/>)}
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
} 