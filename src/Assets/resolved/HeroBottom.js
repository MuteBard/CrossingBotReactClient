import React from 'react';
import SVG from 'react-inlinesvg';
import heroBottom from '../raw/HeroBottom.svg'
import './css/resolved.css'

export default function HeroBottom(){
  return(
    <span className="HeroContainer">
      <SVG className="heroBottom" src={heroBottom}/>
    </span>
  )
}
