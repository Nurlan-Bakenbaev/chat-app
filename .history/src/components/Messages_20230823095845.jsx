import React, { useEffect, useState } from "react";
import Message from "./Message";
import {onSnapshot,doc,getFirestore} from 'firebase/firestore'
const Messages = () => {
  const [messages, setMessages] = useState([])
  const {data}=useContext(ChatContext)
  const db = getFirestore();
  
  useEffect(()=>{
    const unSub = onSnapshot(doc(db,'chats',data.chatId),(doc))
    const {data} = use
  })
  return (
    <div className="messages">
      <Message />
    
  
    </div>
  );
};

export default Messages;
