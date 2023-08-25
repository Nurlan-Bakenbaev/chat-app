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
    <div className="chats">
      {Object.keys(chats).map((chat) => {
      
        return (
          <div className="userChat" key={}>
            <img src={chat?.userInfo?.photoURL} alt="No photo" />
            <div className="userChatInfo">
              <span>{chat?.userInfo?.displayName}</span>
              <p>{chat?.lastMessage?.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
