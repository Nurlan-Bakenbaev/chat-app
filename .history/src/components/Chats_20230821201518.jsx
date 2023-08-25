import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { CurrencyBitcoinTwoTone } from '@mui/icons-material';


const Chats = () => {
  
  const {currentUser}= use

  const[chats,setChats]= useState([])
  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      console.log("Current data: ", doc.data());
  });

  },[])
  return (
    <div className='chats'>
     <div className='userChat'>
        <img src="https://images.pexels.com/photos/5971330/pexels-photo-5971330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="User-img" />
      <div className="userChatInfo">
        <span>Jane</span>
        <p>latest messages</p>
      </div>
      </div>
    </div>
  )
}

export default Chats