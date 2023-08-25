import React, { useContext } from "react";
import PermCameraMicIcon from '@mui/icons-material/PermCameraMic';
import Messages from "./Messages";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Input from "./Input";
import { ChatContext } from "./context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <PermCameraMicIcon/>
          
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;