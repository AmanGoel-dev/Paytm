import React from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between m-3 ">
      <div className=" flex  items-center space-x-3">
        <div className=" rounded-full bg-gray-300 text-center w-10 h-10 flex justify-center items-center">
          {user.firstName[0]}
        </div>
        <div className=" font-bold text-xl"> {user.firstName} </div>
      </div>
      <div>
        <Button
          onclick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          trueval={"Send Money"}
        />
      </div>
    </div>
  );
};

export default User;
