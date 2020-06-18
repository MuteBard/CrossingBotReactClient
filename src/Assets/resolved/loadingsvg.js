import React from 'react';
import SVG from 'react-inlinesvg';
import loadingRaw from '../raw/loading.svg'
import './css/resolved.css'

export default function LoadingSVG(){
  return(
    <span>
      <SVG className="loading" src={loadingRaw}/>
    </span>
  )
}
