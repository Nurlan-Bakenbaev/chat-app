import React from "react";
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2 className="logo">Chat App</h2>
        <span className="title"> Register form</span>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file"style={{display:'none'}} id="file" className="fileUpload" />
          <label htmlFor="file" className="fileSvg">
          </label>
          <button>Sign In</button>
        </form>
        <p>
          Do you have an account? <span> Login</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
