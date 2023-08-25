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
const dataChat = Object.entries(chats)
console.log(dataChat)
  return (
    <div className="chats">
      {dataChat.map((chat) => {
        const userInfo = chat[0][1];
        const lastMessage = chat[1][1];
        return (
          <div className="userChat" key={chat[0]}>
            <img src={userInfo.photoURL} alt="No photo" />
            <div className="userChatInfo">
              <span>{userInfo.displayName}</span>
              <p>{lastMessage?.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
