import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import onAuthStateChanged from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
   const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    
   re
  }, []);
  <AuthContext.Provider value={{ currentUser }}>
    {children}
  </AuthContext.Provider>;
};
