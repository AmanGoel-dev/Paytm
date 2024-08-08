import React, { useEffect, useState } from "react";
import axios from "axios";
const Balance = () => {
  const [value, setvalue] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        console.log(resp.data.balance);
        return setvalue(resp.data.balance);
      });
  }, []);
  return (
    <div className=" flex space-x-2 p-5  items-center shadow-sm rounded">
      <div className=" font-bold text-lg">Your balance</div>
      <div className=" font-semibold text-lg">Rs {value.toFixed(2)}</div>
    </div>
  );
};

export default Balance;
