import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chat from "./Search";



const SideBar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search/>
      <Chat/>
    </div>
  );
};

export default SideBar;
