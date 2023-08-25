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
        <span>{{currentUser.userName}}</span>
        <img
          src={currentUser.photoUrl}
          alt="accaunt-photo"
        />
        <Button onClick={()=>signOut(auth)} variant="contained" endIcon={<LogoutIcon />}>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
