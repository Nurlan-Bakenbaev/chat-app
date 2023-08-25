import React from "react";
import DuoIcon from "@mui/icons-material/Duo";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Messages from "./Messages";
import Input from "./Input";
const Chat = () => {
  const 
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <DuoIcon />
          <PersonAddIcon />
          <MoreHorizIcon />
        </div>
      </div>
      <div className="chat-input-grid"></div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
