import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <span>Nurlan</span> <img src="" alt="" />
        <button>log out</button>
      </div>
    </div>
  );
};

export default Navbar;
