import React from 'react'

//import css
import { inputStyle } from '../pages/stylepages'
import { MdAlternateEmail } from 'react-icons/md'
import { BsKeyFill } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { FaRegCommentDots } from 'react-icons/fa'

export default function Input(props) {

    const handleIcons = () => {
        if(props.type === "email") {
            return <MdAlternateEmail />
        }
        else if(props.type === "password") {
            return <BsKeyFill />
        }
        else if(props.type === "text" && props.id !== "title") {
            return <BiUser />
        }
        else if(props.type === "text" && props.id === "title") {
            return <FaRegCommentDots />
        }
    }

  return (
    <div className="relative">
        <input 
        value={props.value}
        onChange={(e) => props.func(e)}
        className={inputStyle} type={props.type} name={props.id} id={props.id} placeholder={props.placeholder}/>
        {props.help === "password" && (
            <p className="text-xs pt-2">Forgot your password ? click <a href="#" className="font-medium hover:text-slate-500">here</a></p>
        )}
        <div className="absolute top-3.5 left-4">
            {handleIcons()}
        </div>
    </div>
  )
}
