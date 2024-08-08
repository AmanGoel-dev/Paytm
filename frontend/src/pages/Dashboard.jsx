import React from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import User from "../components/User";
import Users from "../components/Users";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [searchparams] = useSearchParams();
  const name = searchparams.get("name");
  return (
    <div className=" bg-white h-screen space-y-4">
      <Appbar value={name} />
      <Balance />
      <Users />
    </div>
  );
};

export default Dashboard;
