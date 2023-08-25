import React from "react";
import Navbar from "./Navbar";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search></Search>
    </div>
  );
};

export default SideBar;
