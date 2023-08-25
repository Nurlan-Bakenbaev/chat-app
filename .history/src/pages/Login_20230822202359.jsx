import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@mui/material";

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
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home')
    } catch (error) {
      setErr(true);
      console.log()
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2 className="logo">Chat App</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <Button size="small" variant="contained">Sign In</Button>
        </form>

        {err && <span>Something went wrong</span>}

        <p>
          You don't have an account?{" "}
          <span>
            <Link to={"/signUp"}>Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
