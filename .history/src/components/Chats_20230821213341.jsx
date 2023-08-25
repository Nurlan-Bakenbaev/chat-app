import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore"; // Import 'getFirestore'
import { AuthContext } from "./context/AuthContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const db = getFirestore();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      if (currentUser?.uid) {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          const chatData = doc.data();
          console.log("Fetched chat data:", chatData);
          setChats(chatData);
        });
  
        return () => {
          unsub();
        };
      }
    };
  
    getChats();
  }, [currentUser?.uid, db]);
  This will help you verify whether the query is returning the expected data.
  
  Check Firestore Rules: If your Firestore security rules are set up, ensure that the current user has the necessary permissions to read the "userChats/${currentUser.uid}" document.
  
  Network Activity: Use your browser's developer tools to inspect the network activity. Check if there are any errors or issues related to fetching the data from Firestore.
  
  Handle chats Object in Rendering: Since the chats object might not be available immediately, add a conditional check before attempting to access its properties in the rendering part of your component:
  
  jsx
  Copy code
  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)
          .sort((a, b) => b[1].date - a[1].date)
          .map(([chatId, chatData]) => (
            <div className="userChat" key={chatId}>
              <img src={chatData.userInfo.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chatData.userInfo.displayName}</span>
                <p>{chatData.lastMessage?.text}</p>
              </div>
            </div>
          ))}
    </div>
  );
  Adding this conditional check will prevent accessing the Object.entries method on an undefined or null chats object.
  
  By carefully inspecting your data structure, Firestore query, and using debugging techniques, you should be able to identify the root cause of the issue and resolve the "Cannot convert undefined or null to object" error.
  
  
  
  
  
  

  return (
    <div className="chats">
      {Object.entries(chats).map((chat) => (
        <div className="userChat">
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
