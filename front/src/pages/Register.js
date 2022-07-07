import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

//import components
import BlockHome from '../components/BlockHome'
import Button from '../components/Button'
import Input from '../components/Input'
import TitleBlock from '../components/TitleBlock'

//import css
import { defaultPage } from './stylepages'
import { FaUserPlus } from 'react-icons/fa'
import { BiUserPlus } from 'react-icons/bi'
import { createUser } from '../graphql/mutation'
import Alert from '../components/Alert'

export default function Register() {

    const navigate = useNavigate()

    const [ form, setForm ] = useState({
        email: "",
        firstname: "",
        lastname: "",
        password: ""
    })
    const [ alert, setAlert ] = useState({
        toggle: false,
        type: "",
        message: ""
    })

    const handleChange = (e) => {
        if(e.target.id === "email") setForm({...form, email: e.target.value})
        else if(e.target.id === "firstname") setForm({...form, firstname: e.target.value})
        else if(e.target.id === "lastname") setForm({...form, lastname: e.target.value})
        else if(e.target.id === "password") setForm({...form, password: e.target.value})
    }

    const handleClick =  (e, target) => {
        e.preventDefault()
        if(target === "register") {
            if(form.email !== "" && form.firstname !== "" && form.lastname !== "" && form.password !== "") {
                createUser(form.email, form.firstname, form.lastname, form.password)
                .then((data) => {
                    if(!data) {
                        setAlert({
                            toggle: true,
                            type: "danger",
                            message: "Error: Check form's fields"
                        })
                        setTimeout(() => {
                            setAlert({
                                ...alert,
                                toggle:false
                            })
                        }, 2000)
                    }
                   else {
                    setAlert({
                        toggle: true,
                        type: "success",
                        message: "You are going to be redirected"
                    })
                    setTimeout(() => {
                        navigate('/')
                        setForm({
                            firstname: "",
                            lastname: "",
                            email: "", 
                            password: ""
                        })
                        setAlert({
                            ...alert,
                            toggle: false
                        })
                    }, 1000)
                   }
                } )
                .catch((err) => console.log(err))
            }
            else {
                console.log('all fields must be filled')
            }
        }
        else navigate('/')
    }

  return (
    <div className={defaultPage}>
        {alert.toggle && <Alert type={alert.type} message={alert.message}/>}
        <BlockHome>
            <TitleBlock title="social" ext=".net"/>
            <p className="mt-4 text-xs text-center">Start your experience with <span className="font-medium">social.net</span> now !</p>
            <hr className="mt-6 mb-6"/>
            <form className="flex flex-col space-y-2">
                <Input value={form.email} func={handleChange} type="email" id="email" placeholder="email"/>
                <Input value={form.firstname} func={handleChange} type="text" id="firstname" placeholder="firstname"/>
                <Input value={form.lastname} func={handleChange} type="text" id="lastname" placeholder="lastname"/>
                <Input value={form.password} func={handleChange} type="password" id="password" placeholder="password"/>
                <Button func={handleClick} target="register" type="submit" value="Sign-up">
                    <BiUserPlus />
                </Button>
            </form>
            <hr className="mt-6 mb-6" />
            <Button 
            func={handleClick}
            target="/"
            type="classic" value="Already register ?">
                <FaUserPlus />
            </Button>
        </BlockHome>
    </div>
  )
}
