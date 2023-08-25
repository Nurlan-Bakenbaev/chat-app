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
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div> 
          </div>
        ))}
    </div>
  );
};

export default Chats;
 make a function to delete messages chat from FB with button 

ChatGPT
Sure, I can help you create a function to delete chat messages from Firebase within your Chats component. You can follow these steps:

Import necessary Firebase Firestore functions at the beginning of your component file:
javascript
Copy code
import { doc, onSnapshot, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
Modify your Chats component to include a function to delete chat messages:
javascript
Copy code
const Chats = () => {
  // ... your existing code ...

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






