import React, { useState } from "react";
import Message from "./Message";
const Messages = () => {
  const [messages, setMessages] = useState([])
  const {data}=useContext(ChatContext)

  use
  return (
    <div className="messages">
      <Message />
    
  
    </div>
  );
};

export default Messages;
