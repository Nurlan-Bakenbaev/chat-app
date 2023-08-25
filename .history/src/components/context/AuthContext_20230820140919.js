import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext()
import {auth} from '../firebase'
import onAuthStateChanged from 
export const createContextProvider = ({children})=>{
    const[currentUser,setCurrentUser]= useState({})
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>
        setCurrentUser(user))
    },[])
}