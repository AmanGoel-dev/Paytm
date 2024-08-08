import React, { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

const Users = () => {
  const [users, setusers] = useState([]);
  const [filter, setfilter] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        return setusers(response.data.user);
      });
  }, [filter]);
  console.log(users);
  return (
    <div className="p-5  flex flex-col space-y-4">
      <div className=" font-bold  text-xl">Users</div>
      <input
        onChange={(e) => {
          setfilter(e.target.value);
        }}
        type="search"
        name="users"
        placeholder="Search Users..."
        className=" w-full p-3 "
      />
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
