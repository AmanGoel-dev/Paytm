import React from "react";
import { Link } from "react-router-dom";

const Button = ({ trueval, transfer, onclick }) => {
  return (
    <div
      onClick={onclick}
      className={` ${
        transfer ? "bg-green-500" : " bg-black"
      }  text-white text-center text-base  cursor-pointer p-2 rounded-md w-full`}
    >
      {trueval}
    </div>
  );
};

export default Button;
