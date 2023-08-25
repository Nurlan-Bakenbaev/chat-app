import React, { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import {signOut} from "firebase/auth"
import { auth } from "../firebase";
const Navbar = () => {
const {currentUser} = useContext(AudioContext)

  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <span>Nurlan</span>
        <img
          src="https://image.com/photos//-photo-5197322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="accaunt-photo"
        />
        <Button onClick={()=>signOut(auth)} variant="contained" endIcon={<LogoutIcon />}>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
