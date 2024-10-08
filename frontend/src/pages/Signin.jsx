import React, { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Inputemail from "../components/Inputemail";
import Inputpassword from "../components/Inputpassword";
import Button from "../components/Button";
import Warning from "../components/Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className=" bg-stone-400 flex justify-center items-center h-screen">
      <div className=" flex flex-col justify-center bg bg-white w-80 rounded">
        <div className=" flex flex-col p-4 text-center space-y-2">
          <Heading lable={"Sign In"} />
          <Subheading lable={"Enter your credentials to access your account"} />
          <Inputemail
            Onchange={(e) => {
              setusername(e.target.value);
            }}
            placeholder={"goelaman79060@gmail.com"}
            lable={"Email"}
          />
          <Inputpassword
            Onchange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder={"Example234"}
            lable={"Password"}
          />
          <Button
            onclick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard?name=" + username);
            }}
            trueval={"Sign In"}
          />
          <Warning
            placeholder={"Don't have an account ?"}
            place={"/signup"}
            lable={"Sign up"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
