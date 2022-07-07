import React from 'react'

//import css
import { TitleBlockDefault } from './style/componentsStyle'

export default function TitleBlock(props) {
  return (
    <h1 className={TitleBlockDefault}>
        {props.title}
        <span className="font-bold">{props.ext}</span>
    </h1>
  )
}
