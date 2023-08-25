import React from "react";
import Message from "./Message";
const Messages = () => {
  const [messages, setMe]
  const {data}=useContext(ChatContext)

  return (
    <div className="messages">
      <Message />
    
  
    </div>
  );
};

export default Messages;
