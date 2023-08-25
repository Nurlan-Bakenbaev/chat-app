import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  const handleLogout = ()=>{
    ()=>signOut(auth)
  }
  return (
    <div className='navbar'>
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar