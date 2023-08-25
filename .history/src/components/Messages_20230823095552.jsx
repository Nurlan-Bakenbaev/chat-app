import React, { useEffect, useState } from "react";
import Message from "./Message";
const Messages = () => {
  const [messages, setMessages] = useState([])
  const {data}=useContext(ChatContext)

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,'chats',data))
  })
  return (
    <div className="messages">
      <Message />
    
  
    </div>
  );
};

export default Messages;
