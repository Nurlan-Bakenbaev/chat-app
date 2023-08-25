import React, { useState } from "react";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { getAuth, createUserWithEmailAndPassword,updataProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Register = () => {
  const [err, setErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const UserName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[0].value;

    try {
      const auth = getAuth();
      const res = createUserWithEmailAndPassword(auth, email, password);

      const storage = getStorage();
      const storageRef = ref(storage,UserName);

      const uploadTask = uploadBytesResumable(storageRef, file);


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
         setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          await updataProfile((await res).user,{
            usern
          })
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
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
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Do you have an account? <span> Login</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
