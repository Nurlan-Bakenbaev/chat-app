import React, { useState } from "react";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [err,setErr]=useState(false)
  const handleSubmit = async(e) => {
e.preventDefault()
const UserName = e.target[0].value
const email = e.target[1].value
const password = e.target[2].value
const file = e.target[0].value

try{
const auth = getAuth();
const res = createUserWithEmailAndPassword(auth, email, password)
 }
 catch(err){
  setErr(true)
 }
}
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2 className="logo">Chat App</h2>
        <span className="title"> Register form</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="UserName" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            className="fileUpload"
          />
          <label htmlFor="file" className="fileSvg">
            <span>
              <AccountBoxRoundedIcon />
            </span>{" "}
            Add image
          </label>
          <button>Sign Up</button>
          {err && }
        </form>
        <p>
          Do you have an account? <span> Login</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
