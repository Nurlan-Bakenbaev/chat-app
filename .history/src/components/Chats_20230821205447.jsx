import React, { useContext, useEffect, useState } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore"; // Import 'getFirestore'
import { AuthContext } from "./context/AuthContext";

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const db = getFirestore();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return unsub();
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => (
        <div className="userChat" key={chat[0]}>
          <img
            src="https://images.pexels.com/photos/5971330/pexels-photo-5971330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="User-img"
          />
          <div className="userChatInfo">
            <span>{chat[1].userName}</span>
            <p></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
