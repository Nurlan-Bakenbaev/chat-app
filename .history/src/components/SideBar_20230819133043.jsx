import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";



const SideBar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search/>
      <Chats></Chats>
    </div>
  );
};

export default SideBar;
