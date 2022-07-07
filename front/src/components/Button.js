import React from 'react'

//import css
import { BtnStyleDefault, BtnStyleSubmit, BtnStyleClassic, BtnStyleDanger } from './style/componentsStyle'

export default function Button(props) {

    const handleStyle = () => {
        if(props.type === "submit") {
            return `${BtnStyleDefault} ${BtnStyleSubmit}`
        }
        else if(props.type === "classic") {
            return `${BtnStyleDefault} ${BtnStyleClassic}`
        }
        else if(props.type === "danger") {
            return `${BtnStyleDefault} ${BtnStyleDanger}` 
        }
    }

  return (
    <button 
    onClick={(e) => props.func(e, props.target)}
    className={handleStyle()}>
        {props.children}
        <span className="text-xs ml-2">{props.value}</span>
    </button>
  )
}
