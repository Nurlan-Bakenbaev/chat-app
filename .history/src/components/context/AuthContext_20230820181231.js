import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import onAuthStateChanged from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
   const  onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);
  <AuthContext.Provider value={{ currentUser }}>
    {children}
  </AuthContext.Provider>;
};
