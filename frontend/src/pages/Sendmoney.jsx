import React, { useState } from "react";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const Sendmoney = () => {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const name = searchParam.get("name");
  const [amount, setamount] = useState(0);
  return (
    <div className="bg-slate-200 flex justify-center items-center h-screen  ">
      <div className="bg-white flex flex-col text-center  p-10 w-96 space-y-4 shadow-lg rounded">
        <Heading lable={"Send Money"} />
        <div className=" flex space-x-2 items-center">
          <div className=" rounded-full bg-green-500  text-white text-center w-10 h-10 flex justify-center items-center">
            {name[0].toUpperCase()}
          </div>
          <div className=" font-bold text-xl">{name}</div>
        </div>
        <div>
          <Inputbox
            Onchange={(e) => {
              setamount(e.target.value);
            }}
            type="number"
            lable={"Amount in Rs"}
            placeholder={"Enter amount"}
          />
        </div>

        <Button
          onclick={() => {
            axios.post(
              "http://localhost:3000/api/v1/account/transfer",
              {
                amount,
                transfer: id,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
          }}
          trueval={"Initiate Transfer"}
          transfer={"true"}
        />
      </div>
    </div>
  );
};

export default Sendmoney;
