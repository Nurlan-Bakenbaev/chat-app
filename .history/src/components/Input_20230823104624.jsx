import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";

const Input = () => {
  const 
  const {currentUser}= useContext(AuthContext)
  const {data}= useContext(ChatContext)
  return (
    <div className="input-wrapper">
      <input className="input" type="text" placeholder="Type something..." />
      <div className="send">
        <label htmlFor="send-file">
          <AttachFileIcon />
        </label>
        <input type="file" id="send-file" style={{ display: "none" }} />
        <Button size="small" variant="contained" endIcon={<SendIcon />}>
         Send
        </Button>
      </div>
    </div>
  );
};

export default Input;
