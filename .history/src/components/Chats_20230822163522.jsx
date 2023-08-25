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

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  return (
    <div className="chats">
      {Object.entries(chats.map((chat) => (
        <div className="userChat" key={chat[0]}>
          <img src={chat?.userInfo?.photoURL} alt="No photo" />
          <div className="userChatInfo">
            <span>{chat?.userInfo?.displayName}</span>
            <p>{chat?.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
