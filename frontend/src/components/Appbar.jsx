import React from "react";

const Appbar = ({ value }) => {
  return (
    <div className=" flex  justify-between p-5  w-full shadow-lg">
      <div className=" font-bold  text-2xl ">TAP It</div>
      <div className="flex space-x-4  items-center font-medium  ">
        <div>Hello,{value}</div>
        <div className=" rounded-full bg-gray-300 text-center w-10 h-10 flex justify-center items-center">
          {" "}
          {value[0]}{" "}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
