import React from 'react';
import SVG from 'react-inlinesvg';
import HamburgerRaw from '../raw/hamburger.svg'
import './css/resolved.css'

export default function Hamburger(){
  return(
    <span>
      <SVG className="hamburger" src={HamburgerRaw}/>
    </span>
  )
}
