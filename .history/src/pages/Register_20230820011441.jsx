import React from "react";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const handleSubmit = (e) => {
e.preventDefault()
const UserName = e.target[0].value
const Email = e.target[1].value
const Password = e.target[2].value
const avatarImage = e.target[3].value


const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  };
 
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
        </form>
        <p>
          Do you have an account? <span> Login</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
