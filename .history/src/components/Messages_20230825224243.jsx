import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import { deleteDoc } from "firebase/firestore";

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
  const handleDelete = async (message) => {
    try {
      console.log("Deleting message with ID:", message.id);

      await deleteDoc(doc(db, "chats", message[1]));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="messages">
      {messages.map((m) => (
        <>
          <Message message={m} key={m.id} handleDelete={handleDelete} />
        </>
      ))}
    </div>
  );
};

export default Messages;
