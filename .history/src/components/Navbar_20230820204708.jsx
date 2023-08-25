import React, { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import {signOut} from "firebase/auth"
import { auth } from "../firebase";
import { AuthContext } from "./context/AuthContext";
const Navbar = () => {
const {currentUser} = useContext(AuthContext)
console.log(currentUser)
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <span>{currentUser.displayName}</span>
        <img
          src={currentUser.photoURL}
          alt="account-photo"
        />
        <Button onClick={()=>signOut(auth)} variant="contained" endIcon={<LogoutIcon />}>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
