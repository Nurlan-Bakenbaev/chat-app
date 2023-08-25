import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { db } from "../firebase";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

const Chats = () => {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div  style={{width:'80%', display: "flex", alignItems: "center",justifyContent:'space-between' }}>
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo?.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo?.displayName}</span>
                <p>{chat[1].lastMessage?.text.slice(0, 10)}</p>
              </div>
            </div>
            <Button
              onClick={() => handleDelete(chat[0])}
              variant="contained"
              color="success"><DeleteIcon/> </Button>
          </div>
        ))}
    </div>
  );
};

export default Chats;
