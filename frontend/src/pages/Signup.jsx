import React, { useState } from "react";
import axios from "axios";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Inputbox from "../components/Inputbox";
import Inputemail from "../components/Inputemail";
import Inputpassword from "../components/Inputpassword";
import Button from "../components/Button";
import Warning from "../components/Warning";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className=" bg-slate-400 h-screen flex justify-center items-center">
      <div className="bg-white w-80  rounded-lg flex  flex-col justify-center ">
        <div className=" text-center p-4 flex flex-col space-y-2">
          <Heading lable={"Sign up"} />
          <Subheading lable={"Enter your information to create an account"} />
          <Inputbox
            Onchange={(e) => {
              setFirstname(e.target.value);
            }}
            lable={"First Name"}
            placeholder={"John"}
          />
          <Inputbox
            Onchange={(e) => {
              setLastname(e.target.value);
            }}
            lable={"Last Name"}
            placeholder={"Doe"}
          />
          <Inputemail
            Onchange={(e) => {
              setusername(e.target.value);
            }}
            placeholder={"goelaman79060@gmail.com"}
            lable={"Email"}
          />
          <Inputpassword
            Onchange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"Example234"}
            lable={"Password"}
          />
          <Button
            onclick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username,
                  firstName,
                  lastName,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard?name=" + firstName);
            }}
            trueval={"Sign Up"}
          />
          <Warning
            placeholder={"Already have an account ?"}
            place={"/signin"}
            lable={"Sign in"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
