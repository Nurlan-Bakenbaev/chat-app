import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName}_${date}`);

      // Upload user avatar
      await uploadBytesResumable(storageRef, file);

      // Get the download URL for the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Update user profile
      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });

      // Create user document in Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      // Create empty user chats document in Firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});
     navigator('/home');
    } catch (error) {
      console.error("Registration error:", error);
      setErr(true);
    } finally {
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
          <Button disabled={loading} variant="contained" color="success" type="submit">
            Sign up
          </Button>
          {loading && "Uploading... "}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Do you have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
