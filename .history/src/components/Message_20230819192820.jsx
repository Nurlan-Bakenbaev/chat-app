import React from "react";
import { Avatar } from "@mui/material";

const Message = () => {
  return (
    <div className="message">
      <div className="messageInfo">
        <Avatar alt="Cindy Baker" src="" sx={{ width: 30, height: 30 }} />
      <span>Post Data</span>
      </div>
      <div className="messageContent">
        <p>Hello chat app</p>
      </div>
    </div>
  );
};

export default Message;
