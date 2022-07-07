import React from "react";

//import components
import Button from "../../components/Button";

//import css
import { addPostDefault } from "../style/componentsStyle";
import { BiPaperPlane } from 'react-icons/bi'
import Input from "../Input";

export default function AddPost() {
  const handleClick = (e) => {
    console.log(e);
  };

  const handleChange = (e) => {
      console.log(e)
  }

  return (
    <div className={addPostDefault}>
      <form className="p-2 w-full flex flex-col space-y-2">
          <h1 className="font-medium text-sm">Wanna share your thought ?</h1>
          <Input value='Title news' func={handleChange} type="text" id="title" placeholder="title"/>
        <textarea className="p-2 resize-none focus:bg-zinc-100 border outline-none text-sm" />
        <div className="ml-auto mr-0 w-1/2">
          <Button
            func={handleClick}
            target="register"
            type="submit"
            value="Submit"
          >
            <BiPaperPlane />
          </Button>
        </div>
      </form>
    </div>
  );
}
