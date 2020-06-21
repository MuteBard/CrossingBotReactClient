import React, {Component} from 'react';
import { Row, Col, Card, Radio, Modal, Button } from 'antd'; 
import * as Route from '../Actions/Route';

import "antd/dist/antd.css";
import "./css/pages.css" 

import BugHeader from '../Components/BugHeader'
import FishHeader from '../Components/FishHeader'
import BugBody from '../Components/BugBody'
import FishBody from '../Components/FishBody'
import LightCog from '../Assets/resolved/backgroundcogLight'

import DisplayBug from '../Assets/resolved/bugIcon'
import DisplayFish from '../Assets/resolved/fishIcon'



const CATCH = "catch"
const BUG = "bug"
const FISH = "fish"
const SELL = "sell"
const SELLALL = "sellall"


export default class Catch extends Component {
    state = {
        visible: false,
        username: localStorage.getItem('username'),
        userBells : 0,
        species : BUG,
        name : "",
        img : "",
        bells: 0,
        rarity: "",
        availability: [],
        pocketBugs : [],
        pocketFishes : [],
      };

    componentDidMount = () => {
        if(this.props.state !== undefined){
            this.setState({
                username : this.props.state.username
            })
            this.updateData()
        }   
    }

    updateData = () => {
        let CBAS_Payload = { username: this.state.username}
        Route.queryUserPocket(CBAS_Payload, this.setCatchPocketData)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    setCatchPocketData = (data) => {
        if(data === "BugOverflow" || data === "FishOverflow"){
            this.showModal()
        }
        else if(data.newCreature === true){
            this.setState({
                name : data.name,
                bells : data.bells,
                rarity : data.rarity,
                availability : data.availability,
                img : data.img,
                hover: false,
                small:false
            })
            this.updateData()
        }
        else{
            let pocketBugs = data.getUser.pocket.bug.map(bug => Object.assign(bug, {hover: true, small: true}))
            let pocketFishes = data.getUser.pocket.fish.map(fish => Object.assign(fish, {hover: true, small: true}))
            this.setState({
                userBells : data.getUser.bells,
                pocketBugs,
                pocketFishes
            })
        }
    }

    speciesSelect = e => {
        this.setState({ 
            species : e.target.value,
            name : "",
            bells : "",
            rarity : "",
            availability : "",
            img : "",  
        });

    }

    handleChildClick = (action, data) => {
        if (action === CATCH){
            let CBAS_Payload = { username: this.state.username, species : data }
            Route.mutateCatchCatchOneCreature(CBAS_Payload, this.setCatchPocketData)
        }
        else if(action === SELL){
            let CBAS_Payload = { username: this.state.username, species : data.species, name: data.name }
            Route.mutateCatchSellOneCreature(CBAS_Payload, this.updateData)
        }
        else if(action === SELLALL){    
            let CBAS_Payload = { username: this.state.username, species : data}
            Route.mutateCatchSellAllSpecies(CBAS_Payload, this.updateData)
        }
    }

    isPhone = () =>{
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        return vw < 767
      }
    
    isTouchpad = () =>{
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        return vw <= 1024 && vw >= 768
    }



    phone = () => {
        <div className="CatchContainer">
            {this.state.species === BUG ? <BugHeader/> : <FishHeader/>}
        </div>
    }

    touchpad = () => {
        
    }

    laptop = () => {
        return(
            <div className="CatchContainer"> 
                {this.state.species === BUG ? <BugHeader/> : <FishHeader/>}
                <Row className="RadioRow">
                    <Col span={5} offset={2}>
                        <Card>
                            <Radio.Group size="large" onChange={this.speciesSelect} value={this.state.species}>
                                <Radio.Button value={BUG}>Catch Bugs</Radio.Button>
                                <Radio.Button value={FISH}>Catch Fishes</Radio.Button>
                            </Radio.Group>
                        </Card>
                    </Col>
                    <Col span={5} offset={7}>
                        {this.state.img === ""
                        ?
                        this.state.species === BUG  ? <DisplayBug traits={this.state}/> : <DisplayFish traits={this.state}/>
                        :
                        <img alt={this.state.name} src={this.state.img}/>
                        }
                    </Col>
                </Row>
                {this.state.species === BUG ? <BugBody data={this.state} handleClick={this.handleChildClick}/>  : <FishBody data={this.state} handleClick={this.handleChildClick}/>}
                <Modal
                    title={`Too Many ${this.state.species === BUG ? "Bugs" : "Fishes"}`}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Cancel
                    </Button>
                    ]}
                > 
                    <p>
                        Sell a couple {this.state.species === BUG ? "bugs" : "fishes"} first before catching more
                    </p>
                </Modal>
                <LightCog/>
                
            </div> 
        )
    }

    view = () => {
        if(this.isPhone()){
          return this.phone()
        } else if(this.isTouchpad()){
          return this.touchpad()
        }else{
          return this.laptop()
        }
    }


    render() {
        return(this.view())
    }
}
