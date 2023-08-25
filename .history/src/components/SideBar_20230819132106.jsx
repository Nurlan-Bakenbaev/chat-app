import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chat from "./Chat";
import { ChatSharp } from "@mui/icons-material";



const SideBar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search/>
      <ChatSharp/>
    </div>
  );
};

export default SideBar;
