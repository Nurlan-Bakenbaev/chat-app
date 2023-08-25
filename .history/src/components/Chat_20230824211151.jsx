import React, { useContext } from "react";
import PermCameraMicIcon from "@mui/icons-material/PermCameraMic";
import Messages from "./Messages";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Input from "./Input";
import { ChatContext } from "./context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
 const  handleAlert = ()=>{
  alert('This functions are working yet')
 }
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcons"onClick={handleAlert}>
          <PermCameraMicIcon />
          <AddBoxIcon />
          <MoreHorizIcon />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
