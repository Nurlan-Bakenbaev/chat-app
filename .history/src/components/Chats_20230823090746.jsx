import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { AuthContext } from "./context/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const db = getFirestore();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      if (currentUser?.uid) {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser.uid),
          (doc) => {
            const chatData = doc.data();
            setChats(chatData);
            console.log("Fetched chat data:", chatData);
          }
        );

        return () => {
          unsub();
        };
      }
    };

    currentUser.uid && getChats();
  }, [currentUser.uid, db]);
  return (
    return (
      <div className="chats">
        {chats && Object.entries(chats).map(([chatId, chatData]) => {
          if (!chatData.displayName) {
            return null; // Skip rendering if displayName is missing
          }
          
          return (
            <div className="userChat" key={chatId}>
              <img src={chatData.photoURL || "default-photo-url"} alt="No photo" />
              <div className="userChatInfo">
                <span>{chatData.displayName}</span>
                <p>{chatData.lastMessage || "No messages yet"}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
    This addition will ensure that if displayName is missing in the chatData, the respective chat entry won't be rendered in the UI.
    
    
    
    
    
    
  );
};

export default Chats;
