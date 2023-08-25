import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, getFirestore } from "firebase/firestore"; // Import 'getFirestore'
import { AuthContext } from "./context/AuthContext";

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

    getChats();
  }, [currentUser?.uid, db]);
  return (
    <div className="chats">
      {Object.entries(chats).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
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
