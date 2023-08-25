import { doc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleDeleteMessage = async (chatId, messageId) => {
    try {
      // Construct the Firestore document reference for the chat
      const chatRef = doc(db, "userChats", currentUser.uid);

      // Delete the specific message from the messages array using arrayRemove
      await updateDoc(chatRef, {
        [`chats.${chatId}.messages`]: arrayRemove(chatId),
      });

      // Alternatively, if you want to delete the entire message object:
      // await deleteDoc(doc(db, "userChats", currentUser.uid, "chats", chatId, "messages", messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
              {/* ... your existing chat rendering code ... */}
              <button onClick={() => handleDeleteMessage(chat[0], chat[1].lastMessage?.id)}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;






