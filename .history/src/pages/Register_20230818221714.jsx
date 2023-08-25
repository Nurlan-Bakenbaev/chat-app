import React from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2 className="logo">Chat App</h2>
        <span className="title"> Register form</span>
        <form>
          <input type="text" placeholder="User Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file"style={{display:'none'}} id="file" className="fileUpload" />
          <label htmlFor="file" className="fileSvg" pla>
           <span><FileUploadIcon /></span> 
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
