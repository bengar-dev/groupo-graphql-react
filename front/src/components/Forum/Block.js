import React from 'react'

export default function Block(props) {
  return (
    <div className="w-1/2 bg-white p-2 rounded-lg shadow-lg text-slate-800">
        {props.children}
    </div>
  )
}
