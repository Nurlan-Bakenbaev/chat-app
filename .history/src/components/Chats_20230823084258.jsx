import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
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
  }, [currentUser.uid, db]);
  return (
    <div className="chats">
      {chats && Object.entries(chats).map((chat) => {
        chat[1].displayName ?  
        return (
          <div className="userChat" key={chat[0]}>
            <img src={chat[1]?.photoURL} alt="No photo" />
            <div className="userChatInfo">
              <span>{chat[1].displayName}</span>
              <p>{"last message"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
