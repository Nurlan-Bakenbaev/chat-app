import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import { updateDoc,deleteField } from "firebase/firestore";

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
      const chatRef = doc(db, "chats", data.chatId);
      const messagesRef = doc(chatRef, "messages", messageId);

      // Delete the message from the messages subcollection
      await deleteDoc(messagesRef);
    } catch (error) {
      console.error("Error deleting message:", error);
    }}

  

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
