import React from 'react';
import SVG from 'react-inlinesvg';
import heroTop from '../raw/HeroTop.svg'
import './css/resolved.css'

export default function HeroTop(){
  return(
    <span className="HeroContainer">
      <SVG className="heroTop" src={heroTop}/>
    </span>
  )
}