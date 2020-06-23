import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from "react-router-dom"

import Header from './Components/Header'
import Footer from './Components/Footer'
import Loading from './Pages/Loading'
import Home from './Pages/Home'
import Market from './Pages/Market'
import Catch from './Pages/Catch'
import Profile from './Pages/Profile'
import LightCog from './Assets/resolved/backgroundcogLight'


export default class App extends Component{
  state = {
    username : "",
    avatar : "",
    authorized : false,
    media : ""
  }

  componentDidMount(){
    let media = ""
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if( vw < 767 ) media = "phone"
    else if(vw <= 1024 && vw >= 768) media = "touchpad"
    else media = "laptop"
    
    this.setState({
      username : localStorage.getItem('username'),
      avatar : localStorage.getItem('avatar'),
      authorized : localStorage.getItem('authorized'),
      media
    })
  }


  setGlobalUser = (data) => {
    localStorage.setItem('username', data.username);
    localStorage.setItem('avatar', data.avatar);
    localStorage.setItem('authorized', data.authorized);
    this.setState({
      username : data.username,
      avatar : data.avatar,
      authorized : data.authorized
    })
  }
  
  render(){ 
    return (
      <div>
      
      <BrowserRouter>
        <Header state={this.state}/>
        {
          this.state.authorized === false || this.state.authorized === null
          ?
          <Switch>
            <Route exact path="/" render={() => <Home setGlobalUser={(data) => this.setGlobalUser(data)}  state={this.state} />}/> 
            <Route exact path="/loading" render={() => <Loading/>}/>
            <Route exact path="/profile" render={() => <Loading/>}/>
            <Route exact path="/market" render={() => <Loading/>}/>
            <Route exact path="/catch" render={() => <Loading/>}/>
          </Switch>
          :
          <Switch>
            <Route exact path="/" render={() => <Home setGlobalUser={(data) => this.setGlobalUser(data)}  state={this.state}/>}/> 
            <Route exact path="/loading" render={() => <Loading/>}/>
            <Route exact path="/profile" render={() => <Profile state={this.state}/>}/>
            <Route exact path="/market" render={() => <Market state={this.state}/>}/>
            <Route exact path="/catch" render={() => <Catch state={this.state}/>}/>
          </Switch>
        }
        <LightCog/>
        <Footer/>
        </BrowserRouter>
      </div>
    );
  }
}
