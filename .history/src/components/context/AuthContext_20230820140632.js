import { createContext, useState } from "react";
export const AuthContext = createContext()
export const createContextProvider = ({children})=>{
    const[currentUser,setCurrentUser]= useState({})
}