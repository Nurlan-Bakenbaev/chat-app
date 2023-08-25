import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
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
          disabled={isInputEmpty}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Input;
