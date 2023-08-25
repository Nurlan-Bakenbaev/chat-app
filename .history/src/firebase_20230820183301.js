import { initializeApp } from "firebase/app";


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
      const auth = getAuth();
      export 