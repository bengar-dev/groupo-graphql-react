import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

//import css
import { defaultHeader } from "../style/componentsStyle";

//import services graphql
import { getUserInfo } from "../../graphql/queries";
import SearchBar from "./SearchBar";
import DropMenu from './DropMenu'

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false);

  const { userInfo } = useSelector((state) => ({
    ...state.userReducer,
  }));

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    getUserInfo(token.userId)
      .then((res) => {
        dispatch({
          type: "GETUSERINFO",
          payload: res,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate('/')
      window.location.reload();
    }, 1500);
  };

  return (
    <header className={defaultHeader}>
      <Link to='/' className="uppercase text-xl">
        Social<span className="font-bold text-rose-500">.net</span>
      </Link>
      <SearchBar />
      <div className="flex space-x-2">
        <img className="w-10 h-10 rounded-full shadow-lg border border-slate-800 object-cover" src={userInfo.avatar} alt={`avatar ${userInfo.firstname}`} />
        <button
        className="font-medium hover:text-slate-700"
        onClick={(e) => e.preventDefault(setToggle(!toggle))}>
          {userInfo.firstname}
        </button>
      </div>
      {toggle && (
        <DropMenu logout={handleLogout}/>
      )}
    </header>
  );
}
