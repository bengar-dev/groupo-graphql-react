import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//import components
import BlockHome from '../components/BlockHome'
import Button from '../components/Button'
import Input from '../components/Input'
import TitleBlock from '../components/TitleBlock'

//import css
import { defaultPage } from './stylepages'
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { signInUser } from '../graphql/mutation'

export default function Login() {

    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleClick = (e, target) => {
        e.preventDefault()
        if(target === "login") {
            signInUser(form.email, form.password)
                .then(res => {
                    localStorage.setItem('token', JSON.stringify(res))
                    setTimeout(() => {
                        window.location.reload()
                    }, 500)
                })
                .catch(err => console.log(err))
        }
        else navigate(target)
    }

    const handleChange = (e) => {
        if(e.target.id === "email") setForm({...form, email: e.target.value})
        else if(e.target.id === "password") setForm({...form, password: e.target.value})
    }

  return (
    <div className={defaultPage}>
        <BlockHome>
            <TitleBlock title="social" ext=".net"/>
            <p className="mt-4 text-xs text-center">First social-network for enterprise. Meet your workmate and share your thought !</p>
            <hr className="mt-6 mb-6"/>
            <form className="flex flex-col space-y-2">
                <Input value={form.email} func={handleChange} type="email" id="email"/>
                <Input value={form.password} func={handleChange} type="password" id="password" help="password" />
                <Button func={handleClick} target="login" type="submit" value="Sign-in">
                    <FaSignInAlt />
                </Button>
            </form>
            <hr className="mt-6 mb-6" />
            <Button 
            func={handleClick}
            target="register"
            type="classic" value="Not register ?">
                <FaUserPlus />
            </Button>
        </BlockHome>
    </div>
  )
}
