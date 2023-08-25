import React, { useEffect, useState } from "react";
import Message from "./Message";
import {onSnapshot,doc} from 
const Messages = () => {
  const [messages, setMessages] = useState([])
  const {data}=useContext(ChatContext)

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,'chats',data.chatId),(doc))
  })
  return (
    <div className="messages">
      <Message />
    
  
    </div>
  );
};

export default Messages;
