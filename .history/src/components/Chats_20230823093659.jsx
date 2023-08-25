import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const db = getFirestore();

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);


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

  const handleSelect = ()=>{
    dispatch({type:'CHANGE_USER',payload: d})
  }
  return (
    <div className="chats">
      {chats &&
        Object.entries(chats).map(([chatId, chatData]) => {
          if (!chatData.displayName) {
            return null;
          }
          return (
            <div className="userChat" key={chatId} onClick={()=>handleSelect(chatData)}>
              <img
                src={chatData.photoURL || "default-photo-url"}
                alt="No photo"
              />
              <div className="userChatInfo">
                <span>{chatData.displayName}</span>
                <p>{chatData.lastMessage || "No messages yet"}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
