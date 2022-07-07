import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//import css
import { defaultPageForum } from "./stylepages";
import { BiUser } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";

//import components
import Header from "../components/Forum/Header";
import Block from "../components/Forum/Block";
import { getUserInfo } from "../graphql/queries";

export default function Profil() {
  const params = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    getUserInfo(params.id)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const handleEdit = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token.userId === user.id) {
      return (
        <Link to="/edit-profil" className="mr-0 ml-auto">
          <MdOutlineModeEditOutline className="font-bold text-xl hover:text-orange-500" />
        </Link>
      );
    }
  };

  return (
    <div className={defaultPageForum}>
      <Header />
      <Block>
        <h1 className="flex items-center mb-2">
          <BiUser className="text-2xl" />
          <span className="ml-2 font-medium">
            {user.firstname} {user.lastname}
          </span>
          {handleEdit()}
        </h1>
        <hr />
        <img
          src={user.avatar}
          className="mt-2 ml-auto mr-auto w-20 h-20 rounded-full object-cover"
        />
        <table className="mt-6 w-full text-sm">
          <thead className="">
            <tr className="w-1/5"></tr>
            <tr className="w-4/5"></tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-1 bg-zinc-100 border-b">Firstname</td>
              <td className="p-1 bg-zinc-300 border-b">{user.firstname}</td>
            </tr>
            <tr>
              <td className="p-1 bg-zinc-100 border-b">Lastname</td>
              <td className="p-1 bg-zinc-300 border-b">{user.lastname}</td>
            </tr>
            <tr>
              <td className="p-1 bg-zinc-100 border-b">Email</td>
              <td className="p-1 bg-zinc-300 border-b flex items-center">
                {user.email}{" "}
                <button className="ml-2 text-sm text-cyan-600 hover:text-cyan-500">
                  <AiOutlineSend />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Block>
    </div>
  );
}
