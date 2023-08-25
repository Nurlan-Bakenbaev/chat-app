import React, { useEffect, useState,useContext } from "react";
import Message from "./Message";
import { onSnapshot, doc, getFirestore} from "firebase/firestore";
import { ChatContext } from "./context/ChatContext";

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
        <Message message={m}/>
      ))}
    </div>
  );
};

export default Messages;
