import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext()
import auth from
import onAuthStateChanged
export const createContextProvider = ({children})=>{
    const[currentUser,setCurrentUser]= useState({})
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>
        setCurrentUser(user))
    },[])
}