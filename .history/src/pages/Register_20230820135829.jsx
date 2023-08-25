import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firebaseConfig } from "../firebase.js";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = 
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0]; // Use e.target[3].files[0] to get the selected file

    try {
      const auth = getAuth();
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storage = getStorage();
      const storageRef = ref(storage, userName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const db = getFirestore();

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setErr(true);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(res.user, {
              displayName: userName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              userName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db,"usersChat",res.user.uid),{})
          } catch (error) {
            console.error("Error updating profile:", error);
            setErr(true);
          }
        }
      );
    } catch (error) {
      console.error("Error creating user:", error);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2 className="logo">Chat App</h2>
        <span className="title">Register form</span>
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
            </span>
            Add image
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Do you have an account? <span><Link to={'/'}>Login</Link> </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
