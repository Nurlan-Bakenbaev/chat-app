import { doc, onSnapshot, deleteDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { db } from "../firebase";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { Padding } from "@mui/icons-material";

const Chats = () => {
  const handleDelete = async (chatId) => {
    try {
      // Delete the chat document from Firestore
      await deleteDoc(doc(db, "chats", chatId));

      console.log("Chat deleted successfully");
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

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

  const handleSelect = (chatId, chatData) => {
    dispatch({ type: "CHANGE_USER", payload: { chatId, chatData } });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingLeft: "10px",
            }}
          >
            <div
              className="userChat"
              key={chat[0]}
              onClick={() =>  handleSelect(chat[0], chat[1])}>
              <img src={chat[1].userInfo?.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo?.displayName}</span>
                <p>{chat[1].lastMessage?.text?.slice(0, 10)}</p>
              </div>
            </div>
            <Button
              onClick={() => handleDelete(chat[0])}
              variant="contained"
              color="success"
            >
              <DeleteIcon />
            </Button>
            <Button
              variant="contained"
              color="success"
            >
              <ClearIcon />
            </Button>
          </div>
        ))}
    </div>
  );
};

export default Chats;
