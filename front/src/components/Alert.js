import React from 'react'

//components css
import { AlertStyleDanger, AlertStyleDefault, AlertStyleSuccess, AlertStyleWarning } from './style/componentsStyle'

export default function Alert(props) {

    const handleStyle = () => {
        if(props.type === "success") return `${AlertStyleDefault} ${AlertStyleSuccess}`
        else if(props.type === "warning") return `${AlertStyleDefault} ${AlertStyleWarning}`
        else if(props.type === "danger") return `${AlertStyleDefault} ${AlertStyleDanger}`
    }

  return (
    <div className={handleStyle()}>
        {props.message}
    </div>
  )
}
