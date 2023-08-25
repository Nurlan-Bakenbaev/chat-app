import React from "react";
import Navbar from "./Navbar";
import Sea from "./Sea";


const SideBar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search/>
    </div>
  );
};

export default SideBar;
