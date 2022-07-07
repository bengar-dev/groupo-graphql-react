import React from 'react'
import { useNavigate } from 'react-router-dom'

import { GoSignOut } from 'react-icons/go'
import { AiOutlineUser } from 'react-icons/ai'

export default function DropMenu(props) {

  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    const token = JSON.parse(localStorage.getItem('token'))
    navigate(`/profil/${token.userId}`)
    window.location.reload()
  }

  return (
    <div className="absolute right-0 top-20 bg-slate-600 w-28 p-2 text-sm flex justify-center">
          <ul className="flex flex-col">
          <li className="mb-4">
              <button
                className="flex space-x-2 items-center text-slate-200 hover:text-white"
                onClick={(e) => handleClick(e)}
              >
                <AiOutlineUser className="text-white" />{" "}
                <span className="text-xs">My Profil</span>
              </button>
            </li>
            <li>
              <button
                className="flex space-x-2 items-center text-slate-200 hover:text-white"
                onClick={(e) => props.logout(e)}
              >
                <GoSignOut className="text-red-400" />{" "}
                <span className="text-xs">Sign-Out</span>
              </button>
            </li>
          </ul>
        </div>
  )
}
