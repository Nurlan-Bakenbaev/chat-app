import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <span>Nurlan</span>
         <img src="https://images.pexels.com/photos/5197322/pexels-photo-5197322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="accaunt-photo" />
        <button><LogoutIcon/></button>
      </div>
    </div>
  );
};

export default Navbar;
