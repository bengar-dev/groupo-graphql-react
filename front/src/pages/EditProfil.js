import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//components
import Block from "../components/Forum/Block";
import Header from "../components/Forum/Header";
import Alert from "../components/Alert";
//css
import { defaultPageForum } from "./stylepages";
import { GiCancel } from "react-icons/gi";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import Input from "../components/Input";
import Button from "../components/Button";
import { editUser } from "../graphql/mutation";

export default function EditProfil() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [editForm, setEditForm] = useState({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
  });

  const [ alert, setAlert ] = useState({
    toggle: false,
    type: "",
    message: ""
})

  const { userInfo } = useSelector((state) => ({
    ...state.userReducer,
  }));

  useEffect(() => {
    setEditForm({
      id: userInfo.id,
      email: userInfo.email,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
    });
  }, [userInfo.id]);

  const handleClick = (e, target) => {
    e.preventDefault();
    if (target === "submit") {
      if (
        editForm.email !== "" &&
        editForm.firstname !== "" &&
        editForm.lastname !== ""
      ) {
        editUser(
          editForm.id,
          editForm.email,
          editForm.firstname,
          editForm.lastname
        )
          .then((res) => {
            dispatch({
              type: "EDITUSERINFO",
              payload: res
            })
            setAlert({
              toggle: true,
              type: "success",
              message: "Your profil has been edited" 
            })
            setTimeout(() => {
              setAlert({...alert, toggle: false})
            }, 2000)
          })
          .catch((err) => console.log("erreur"));
      }
    } else navigate(target);
  };

  const handleChange = (e) => {
    if (e.target.id === "email")
      setEditForm({ ...editForm, email: e.target.value });
    else if (e.target.id === "firstname")
      setEditForm({ ...editForm, firstname: e.target.value });
    else if (e.target.id === "lastname")
      setEditForm({ ...editForm, lastname: e.target.value });
  };

  return (
    <div className={defaultPageForum}>
      {alert.toggle && <Alert type={alert.type} message={alert.message}/>}
      <Header />
      <Block>
        <h1 className="flex items-center mb-2">
          <FaUserEdit className="text-2xl mr-2" /> Edit my profil
        </h1>
        <hr />
        <p className="mt-6 text-center text-xs">
          Here you can update your informations
        </p>
        <form className="mt-2 flex flex-col space-y-2">
          <Input
            func={handleChange}
            id="email"
            type="email"
            value={editForm.email}
          />
          <Input
            func={handleChange}
            type="text"
            id="firstname"
            value={editForm.firstname}
          />
          <Input
            func={handleChange}
            type="text"
            id="lastname"
            value={editForm.lastname}
          />
          <div className="flex mr-0 ml-auto flex-row-reverse">
            <Button
              func={handleClick}
              target="submit"
              type="submit"
              value="submit"
            >
              <AiFillCheckCircle />
            </Button>
            <Button
              target={`/profil/${userInfo.id}`}
              func={handleClick}
              type="danger"
              value="cancel"
            >
              <GiCancel />
            </Button>
          </div>
        </form>
      </Block>
    </div>
  );
}
