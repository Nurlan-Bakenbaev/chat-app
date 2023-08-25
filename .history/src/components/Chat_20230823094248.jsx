import React, { useContext } from "react";
import DuoIcon from "@mui/icons-material/Duo";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "./context/ChatContext";
const Chat = () => {
  const {data}=useContext(ChatContext)
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
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
