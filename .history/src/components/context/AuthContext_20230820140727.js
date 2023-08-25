import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext()
export const createContextProvider = ({children})=>{
    const[currentUser,setCurrentUser]= useState({})
    useEffect(()=>{
        onAuthState
    },[])
}