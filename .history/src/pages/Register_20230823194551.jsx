import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button } from "@mui/material";
const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/home");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register Page</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Name" />
          <input required type="email" placeholder="email@example.com" />
          <input required type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />

            <label id="add_file" htmlFor="file">
              <AttachFileIcon />
              <span>Your Avatar</span>
            </label>
          <Button disabled={loading} variant="contained" color="success">
          Sign up
          </Button>
          {loading && "Uploading... "}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Do you have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
