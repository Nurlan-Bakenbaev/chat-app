import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { AuthContext } from "./context/AuthContext";

const Chats = () => {
  const [chats, setChats] = useState({});
  const db = getFirestore();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      if (currentUser?.uid) {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data());
        });

        return () => {
          unsub();
        };
      }
    };

    getChats();
  }, [currentUser?.uid, db]);

  return (
    <div className="chats">
      {Object.entries(chats)
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
};

export default Chats;
