import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "firebase/app";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2 className="logo">Chat App</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            className="fileUpload"
          />
          <label htmlFor="file" className="fileSvg">
            {" "}
          </label>
          <button>Sign In</button>
        </form>
        <p>
          You don't have an account?{" "}
          <span>
            {" "}
            <Link to={"/signUp"}>Register</Link>
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
