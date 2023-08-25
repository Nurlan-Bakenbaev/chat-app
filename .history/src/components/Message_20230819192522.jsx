import React from "react";
import { Avatar } from "@mui/material";

const Message = () => {
  return (
    <div className="message">
      <div className="messageInfo">
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </div>
      <div className="messageContent"></div>
    </div>
  );
};

export default Message;
