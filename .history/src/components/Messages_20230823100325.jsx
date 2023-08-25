import React, { useEffect, useState } from "react";
import Message from "./Message";
import { onSnapshot, doc, getFirestore, exists } from "firebase/firestore";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const db = getFirestore();

  useEffect(() => {
    const docRef = doc(db, "chats", data.chatId);
    const unSub = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setMessages(doc.data());
      }
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map(m=>(
        <Message />
      ))}
    </div>
  );
};

export default Messages;
