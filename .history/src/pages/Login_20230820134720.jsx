import React from "react";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2 className="logo">Chat App</h2><hr />
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file"style={{display:'none'}} id="file" className="fileUpload" />
          <label htmlFor="file" className="fileSvg">
          </label>
          <button>Sign In</button>
        </form>
        <p>
          You don't have an account? <span> Register</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
