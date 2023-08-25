import React, { useEffect, useState } from "react";
import Message from "./Message";
import {onSnapshot,doc,getFirestore,exists} from 'firebase/firestore'
const Messages = () => {
  const [messages, setMessages] = useState([])
  const {data}=useContext(ChatContext)
  const db = getFirestore();
  
  useEffect(()=>{
    const unSub = onSnapshot(doc(db,'chats',data.chatId),(doc))
    doc.exists() && setMessages(doc.data())
  })
  return ()=>{
    unSub()
  }
  ),[data.chatId]
  return (
    <div className="messages">
      <Message />
    
  
    </div>
  );
};

export default Messages;
