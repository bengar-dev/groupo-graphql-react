import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BiSearchAlt } from "react-icons/bi";
import { getUsers } from "../../graphql/queries";
import { inputStyle } from "../../pages/stylepages";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [res, setRes] = useState([]);
  const [findUser, setFindUser] = useState();

  const handleChange = (e) => {
    setSearch(e.target.value);
    const findUser = res.find(p => p.firstname.includes(search))
    if(findUser) setFindUser(findUser)
  };

  useEffect(() => {
    if (res.length === 0) {
      getUsers()
        .then((users) => {
          setRes(users);
        })
        .catch((err) => console.log(err));
    }

  }, [search]);

  return (
    <div className="relative flex w-1/3">
      <input
        value={search}
        onChange={(e) => handleChange(e)}
        className={inputStyle}
        type="search"
        name="search"
        id="search"
      />
      {((search.length > 2) && (res.length > 0) && (findUser) )&& (
        <div className="absolute top-12 bg-white border border-slate-800 rounded w-full p-2 text-xs flex flex-col">
          <Link className="p-2 hover:text-red-500 font-medium" to={`/profil/${findUser.id}`} key={findUser.id}>{findUser.firstname}</Link>
        </div>
      )}
      <button className="p-2 bg-slate-800 hover:bg-slate-700 text-white">
        <BiSearchAlt />
      </button>
    </div>
  );
}
