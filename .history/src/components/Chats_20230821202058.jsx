import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { CurrencyBitcoinTwoTone } from "@mui/icons-material";
import { AuthContext } from "./context/AuthContext";

const Chats = () => {
  const { currentUser } = useContext(AuthContext);

  const db
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());
    });
    return () => {
      unsub();
    };
  }, [currentUser.uid]);
  return (
    <div className="chats">
      <div className="userChat">
        <img
          src="https://images.pexels.com/photos/5971330/pexels-photo-5971330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="User-img"
        />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>latest messages</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
