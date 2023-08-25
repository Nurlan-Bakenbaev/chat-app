import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <span>Nurlan</span>
         <img src="https://images.pexels.com/photos/5197322/pexels-photo-5197322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="acca" />
        <button>log out</button>
      </div>
    </div>
  );
};

export default Navbar;
