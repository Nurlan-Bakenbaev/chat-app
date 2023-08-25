import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  setDoc, // Add the import for setDoc
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button } from "@mui/material";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isInputEmpty) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // TODO: Handle Error
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const message = {
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          };

          const messagesArrayUnion = { messages: arrayUnion(message) };

          // Update or create the chat document in the "chats" collection
          await setDoc(doc(db, "chats", data.chatId), messagesArrayUnion, { merge: true });
        }
      );
    } else {
      const message = {
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      };

      const messagesArrayUnion = { messages: arrayUnion(message) };

      // Update or create the chat document in the "chats" collection
      await setDoc(doc(db, "chats", data.chatId), messagesArrayUnion, { merge: true });
    }

    const userChatsUpdates = {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    };

    // Update or create the chat document in the "userChats" collection for the current user
    await setDoc(doc(db, "userChats", currentUser.uid), userChatsUpdates, { merge: true });

    // Update or create the chat document in the "userChats" collection for the other user
    await setDoc(doc(db, "userChats", data.user.uid), userChatsUpdates, { merge: true });

    setText("");
    setImg(null);
  };

  const isInputEmpty = text.trim() === "";

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyPress}
      />
      <div className="send">
        <AttachFileIcon />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <AddPhotoAlternateIcon />
        </label>
        <Button
          onClick={handleSend}
          size="small"
          variant="contained"
          disabled={isInputEmpty}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Input;
