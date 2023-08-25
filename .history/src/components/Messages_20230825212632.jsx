import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const { messages, deleteMessage } = useContext(ChatContext);

  const handleDeleteMessage = (messageToDelete) => {
    deleteMessage(messageToDelete); // Implement this function in your ChatContext to delete the message
  };

  return (
    <div className="messages">
      {messages.map((m) => (
        <>
          <Message message={m} key={m.id} />
  
        </>
      ))}
    </div>
  );
};

export default Messages;
