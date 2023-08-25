import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import {signOu}
const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <span>Nurlan</span>
        <img
          src="https://images.pexels.com/photos/5197322/pexels-photo-5197322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="accaunt-photo"
        />
        <Button onClick={()=>SignpostOutlined()} variant="contained" endIcon={<LogoutIcon />}>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
