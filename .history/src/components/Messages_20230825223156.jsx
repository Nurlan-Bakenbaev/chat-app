import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import { doc, deleteDoc } from "firebase/firestore";

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
  const handleDelete = async (messageId) => {
    try {
      console.log("Deleting message with ID:", messageId);
  
      const messageRef = doc(db, "chats", messageId);
      console.log("Message reference:", messageRef);
  
      await deleteDoc(messageRef);
  
      console.log("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  

  return (
    <div className="messages">
      {messages.map((m) => (
        <>
          <Message message={m} key={m.id}handleDelete={handleDelete} />
  
        </>
      ))}
    </div>
  );
};

export default Messages;
