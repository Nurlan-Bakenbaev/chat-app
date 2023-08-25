import React from "react";
import { Avatar } from "@mui/material";

const Message = () => {
  return (
    <div className="message">
      <div className="messageInfo">
        <Avatar alt="Cindy Baker" src="" sx={{ width: 30, height: 30 }} />
      </div>
      <div className="messageContent"></div>
    </div>
  );
};

export default Message;
