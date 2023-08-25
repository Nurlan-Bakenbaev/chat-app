import { createContext, useEffect, useState } from "react";
export const AuthContextProvider = createContext();
import { auth } from "../firebase";
import onAuthStateChanged from "firebase/auth";
export const AuthContext = createContext
export const createContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);
  <AuthContext.Provider value={{currentUser}}>
    {children}
  </AuthContext.Provider>
};
