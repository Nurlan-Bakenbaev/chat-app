import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBKQxRTlwDtZolWx5tuyYMwL2PQy8U3r-o",
  authDomain: "chatapp-e0ef2.firebaseapp.com",
  projectId: "chatapp-e0ef2",
  storageBucket: "chatapp-e0ef2.appspot.com",
  messagingSenderId: "155506867969",
  appId: "1:155506867969:web:94a613e7a42d1561806500",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();



<div className="input-wrapper">
<input className="input" type="text" placeholder="Type something..." />
<div className="send">
  <label htmlFor="send-file">
    <AttachFileIcon />
  </label>
  <input type="file" id="send-file" style={{ display: "none" }} />
  <Button size="small" variant="contained" endIcon={<SendIcon />}>
   Send
  </Button>
</div>
</div>