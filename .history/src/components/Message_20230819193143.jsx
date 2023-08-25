import React from "react";
import { Avatar } from "@mui/material";

const Message = () => {
  return (
    <div className="message">
      <div className="messageInfo">
        <Avatar
          alt="Cindy Baker"
          src="https://images.pexels.com/photos/5197322/pexels-photo-5197322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          sx={{ width: 30, height: 30 }}
        />
        <span>Post Data</span>
      </div>
      <div className="messageContent">
        <p>Hello chat app</p>
        <img src="" alt="some image" />
      </div>
    </div>
  );
};

export default Message;
