import React, { Component } from 'react';
import {Card, Radio } from 'antd'; 
import generator from 'generate-password';
import "antd/dist/antd.css";
import "./css/pages.css"
import * as Route from '../Actions/Route';
import HeroTop from '../Assets/resolved/HeroTop'
import HeroBottom from '../Assets/resolved/HeroBottom'
import TwitchLogo from '../Assets/resolved/twitchLogo'
import Logo from '../Assets/resolved/logo'
import MagnifyingGlass from '../Assets/resolved/magnifyingGlass'
import Key from '../Assets/resolved/key'

export default class Home extends Component {
  
  state = {
    usernameInput : "",
    searchPressed : false,
    authorized : null,
    passwordInput : "",
    scenario : 0,
    avatar : "",
    radio : "REGISTER"
  }

  usernameInputSearch(e){
    this.setState({
      usernameInput : e,
    })
  }

  passwordInput(e){
    this.setState({
      passwordInput : e
    })
  }

  submitUser(){
    let setUserState = (data) => {    
      this.setState({authorized : data.signIn})
      if( data.signIn === true){
        let globalState = ({
          username: this.state.usernameInput,
          avatar : this.state.avatar,
          authorized : true
       })

       this.props.setGlobalUser(globalState)
      }
    }
    let encryptedPw = this.state.passwordInput //TODO: add bcrypt
    let CBAS_Payload = {"username" : this.state.usernameInput, "encryptedPw" : encryptedPw}
    Route.signIn(CBAS_Payload, setUserState)
  }

  confirmUser(){
    let userAuthenticated = (data) => {
      console.log(data)
      let failure = data === null
      console.log(failure ? "FAILED TO GET RESPONSE FROM CBTC" : "RESPONDED")
      if(data !== null){
        let globalState
        switch(data.scenario){
            // Scenario 1 : User exists on Twitch and exists on CrossingBot DB and has a CrossingBot password
          case 1 : 
            this.setState({
              searchPressed : true,
              avatar : data.avatar,
              scenario : data.scenario,
              radio : "SIGN IN"
            })
            break;
          case 2 : 
            // Scenario 2 : User exists on Twitch and exists on CrossingBot DB but does not have a CrossingBot password but user types !invite
            globalState = ({
              username: this.state.usernameInput,
              avatar : this.state.avatar,
              scenario : data.scenario,
              authorized : true
            })
            this.props.setGlobalUser(globalState)
            Route.signUp(this.generatePayload(data)) 
            break;
            case 3 : 
            // Scenario 3 : User exists on Twitch but does not exist on CrossingBot DB and does not have a CrossingBot password but user types !invite
            globalState = ({
              username: this.state.usernameInput,
              avatar : this.state.avatar,
              scenario : data.scenario,
              authorized : true
            })
            this.props.setGlobalUser(globalState)
            Route.signUp(this.generatePayload(data)) 
            break;
          case 4 : 
            // Scenario 4 : Scenario 2 or Scenario 3 but user fails to type !invite
            this.setState({
              searchPressed : true,
              scenario : data.scenario,
              error : data.error
            })
            break;
          case 5 : 
            // Scenario 5 : User doesn't not exist on Twitch
            this.setState({
              searchPressed : true,
              scenario : data.scenario,
              error : data.error
            })
            break;
          default:
            break;
        }
      }else{
        // Scenario 6 : 500 error, cbtc server is not functioning
        this.setState({
          searchPressed : true,
          scenario : 6,
          error : "server seems to be having a problem"
        })
      }
    }
    // Scenario 7 : Search has been pressed
    this.setState({
      scenario : 7
    })
    let CBTC_payload = {username: this.state.usernameInput}
    Route.authenticateUser(CBTC_payload, userAuthenticated)
  }
  
  generatePayload(data){
    let pw = generator.generate({
        length : 12,
        numbers : true,
        lowercase : true,
        uppercase : true,
        symbols : true,
        excludeSimilarCharacters : true,
    });

    let encryptedPw = pw 
    this.setState({
      searchPressed : true,
      passwordInput : pw,
      avatar : data.avatar,
      scenario : data.scenario,
      authorized : true
    })
    return {"username" : this.state.usernameInput,  "encryptedPw" : encryptedPw}
  }

  onChange = e => {
    this.setState({
      radio: e.target.value,
    });
  };

  searchStep(message){
    let stepTitle = (message) => {
      return(
        this.state.scenario === 1 || this.state.scenario === 2 || this.state.scenario === 3 
        ?
        <div>Found your account</div>
        :
        <div>{message}</div>
      )
    }

    let searchBox = () => {
      return(
        this.state.scenario === 1 || this.state.scenario === 2 || this.state.scenario === 3  
        ?
        <div className="searchMessageContainer">
          <div className="searchMessage"><strong>{this.state.usernameInput}</strong><TwitchLogo/></div>
          <img alt="example" className="profilePicture" src={this.state.avatar}/>
        </div>
        :
        <div className="searchInputContainer">
            <input type="text" className="searchInput" value={this.state.usernameInput} onChange={event => this.usernameInputSearch(event.target.value)}/>
            <button className="button" onClick={() => this.confirmUser()}><MagnifyingGlass/></button>
        </div>
      )
    }

    let feedbackDisplay = () => {
      if(this.state.scenario === 4){
        return(<div className={"error"}>You did not type !invite on your Twitch channel</div>)
      }else if(this.state.scenario === 5){
        return(<div className={"error"}>This username is not a valid Twitch account</div>)
      }else if(this.state.scenario === 6){
        return(<div className={"error"}>Something went wrong. Message MuteBard on Twitter below</div>)
      }else if (this.state.scenario === 7){
        return(<div className={"info"}>Great! Now head to Twitch</div>)
      }else{
        return(null)
      }
    }

    return(
      <li>
        {stepTitle(message)}
        <div className="searchUser">
        {searchBox()}
        {feedbackDisplay()}
        </div>
      </li>
    )
  }


  providedPwBox(){
    let stepTitle = () =>{
        return <div>Success! This is your CrossingBot password, Store it someplace safe!</div>  
    }

    let providedBox = () => {
      return(
        <div className="creationMessageContainer">
          <div className="creationMessage"><strong>{this.state.passwordInput}</strong><Logo tiny={true}/></div>
        </div>
      )
    }

    if (this.state.searchPressed){
      if(this.state.scenario === 2 || this.state.scenario === 3){
        return(
          <li>
            {stepTitle()}
            {providedBox()}
          </li>
        )
      }
      else return null
    }
  }

  inputPwBox(){
    let stepTitle = () =>{
      return(
        this.state.authorized === true
        ?
        <div>Successfully Logged In!</div>
        :
        <div>Enter the provided <strong>Crossingbot</strong> Password (NOT your Twitch Password)</div>
      )
    }

    let inputBox = () => {
      return(
        this.state.authorized === true
        ?
        null
        :
        <div className="PasswordInputContainer">
          <input type="text" className="PasswordInput" value={this.state.passwordInput} onChange={event => this.passwordInput(event.target.value)}/>
          <button className="button" onClick={() => this.submitUser()}><Key/></button>
        </div>
      )
    }


    let feedbackDisplay = () => {
      return(   
        this.state.authorized === false
        ?
        <div className={"error"}>This password is not valid</div> 
        :
        null
      )
    }

    if (this.state.searchPressed){
      if(this.state.scenario === 1){
        return(
          <li className="li">
            {stepTitle()}
            {inputBox()}
            {feedbackDisplay()}
          </li>
        )
      }
      else return null
    }
  }

  view = () => {
      let { media } = this.props.state
    if(media === "phone"){
      return {cardSize : 360}
    }else if(media === "touchpad"){
      return {cardSize : 800}
    }else{
      return {cardSize : 1200}
    }
  }

  render() {
   
    return ( 
      <div className="HomeContainer"> 
        <div className="Row1">
          <HeroTop/>
        </div>
        <div className="Row2">
            <strong>WELCOME TO CROSSINGBOT</strong>
        </div>
        <div className="Row3">
          <HeroBottom/>
        </div>
        <div className="Row4">
          <Card style={{ width: this.view().cardSize, backgroundColor : "#EEEEEE" }}>
              <Radio.Group onChange={this.onChange} value={this.state.radio} defaultValue="REGISTER">
                <Radio.Button value={"REGISTER"}>REGISTER</Radio.Button>
                <Radio.Button value={"SIGN IN"}>SIGN IN</Radio.Button>
              </Radio.Group>
              {
                this.state.radio === "REGISTER"
                ?
                <div className="howToUse"><strong>Join The Village!</strong></div>
                :
                <div className="howToUse"><strong>Welcome Back!</strong></div>
              }
              
              {
                this.state.radio === "REGISTER" 
                ?
                <ol className="listText">
                  <li>First make sure you have a Twitch account on <a href= "https://www.twitch.tv/"><strong>Twitch.tv</strong></a></li>
                  {this.searchStep("Please enter for your Twitch username here (Case Sensitive)")}
                  <li>In another tab, open your Twitch chat within your channel and type !invite</li>
                  {this.providedPwBox()}
                  {
                    this.state.scenario > 1 && ! this.state.scenario === 7
                    ?
                    <li>Awesome! {this.state.usernameInput}, you are all set to use CrossingBot either on Twitch or on this website!  </li>
                    :
                    null
                  }
                </ol>
                
                :
                <ol className="listText">
                  {this.searchStep("Welcome Back! Please enter your Twitch username (Case Sensitive)")}
                  {this.inputPwBox()}
                </ol>
              }
          </Card>
        </div>
        <div className="Row5">
          <Card style={{ width: this.view().cardSize, backgroundColor : "#EEEEEE" }}>
            <div className="howToUse"><strong>Twitch Commands</strong></div>
            <ul className="listText">
            <li><strong>!bug</strong> Catch a bug</li>
            <li><strong>!fish</strong> Catch a fish</li>
            <li><strong>!sell [creature name]</strong> Removes a bug or fish from your pocket and you get its value in bells stored to your own bells</li>
            <li><strong>!sell all</strong> Removes everything from your pocket and you get the total value in bells added to your own bells</li>
            <li><strong>!rare bugs</strong> List rare bugs available this month</li>
            <li><strong>!rare fishes</strong> List rare fishes available this month</li>
            <li><strong>!pocket</strong> Displays all bugs and fish in your pocket</li>
            <li><strong>!bells</strong> Displays current bells owned</li>
            <li><strong>!turnips</strong> Displays how many turnips you own and how they are faring in the market</li>
            <li><strong>!market</strong> Displays the prices of turnips on the ever changing Stalk Market</li>
            <li><strong>!buy [quantity] turnips</strong> Allows you to buy turnips</li>
            <li><strong>!sell [quantity] turnips</strong> Allows you to sell turnips</li>
            <li><strong>!confirm</strong> Allows for execution of a turnip transaction</li>
            <li><strong>!cancel</strong> Allows for termination of a turnip transaction</li>
            </ul>
          </Card>
        </div>
      </div> 
    )
  }
}