import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot,getFirestore } from "firebase/firestore"; // Import 'getFirestore'
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
            console.log("Fetched chat data:", chatData);
            setChats(chatData);
          }
        );

        return () => {
          unsub();
        };
      }
    };

    getChats();
  }, [currentUser?.uid, db]);
let chap;
  return (
    <div className="chats">
     
        <div className="userChat">
          <img src={chap[1].userInfo.photoURL} alt="chap" />
          <div className="userChatInfo">
            <span></span>
            <p></p>
          </div>
        </div>
    </div>
  );
};

export default Chats;
