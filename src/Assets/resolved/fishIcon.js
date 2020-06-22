import React from 'react';
import SVG from 'react-inlinesvg';
import { Popover, Button } from 'antd';
import fishIcon from '../raw/fishIcon.svg'
import './css/resolved.css'

const FISH = "fish"
const SELL = "sell"

export default function FishIcon({traits, handlePocketClick}){

  let { name, bells, rarity, availability, img, small, hover} = traits

  const content = (
    hover ?
    <div>
      <p>Bells : {bells}</p>
      <p>Rarity : {rarity}</p>
      <p>Availability: {availability.map((month, idx, array) => {
          if(idx === array.length - 1)return `${month}`
          else return `${month}, `
        })}
      </p>
      <Button type="primary" block onClick={() => handlePocketClick(SELL, {species : FISH, name})}>
        Sell for {bells} bells
      </Button>
    </div>
    :
    null
  )
  
  return(
    <span>
      {
        hover 
        ? 
        <Popover content={content} title={name}>
          {
            img
            ? 
            <img alt={name} className={small ? "fishIconSmall fade-in" : "fishIcon fade-in"} src={img}/>
            :
            <SVG className={small ? "fishIconSmall fade-in" : "fishIcon fade-in" } src={fishIcon}/>
          } 
        </Popover>
        :
        <div className="Icon">
          {
            img 
            ? 
            <img alt={name} className={small ? "fishIconSmall fade-in" : "fishIcon fade-in"} src={img}/>
            :
            <SVG className={small ? "fishIconSmall fade-in" : "fishIcon fade-in" } src={fishIcon}/>
          } 
        </div>
      }
    </span>
  )
}

