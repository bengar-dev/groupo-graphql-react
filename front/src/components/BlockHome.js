import React from 'react'

//import css
import { BlockHomeDefault } from './style/componentsStyle'

export default function BlockHome(props) {
  return (
    <div className={BlockHomeDefault}>
        {props.children}
    </div>
  )
}
