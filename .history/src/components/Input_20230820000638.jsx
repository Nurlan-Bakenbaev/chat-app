import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
const Input = () => {
  return (
    <div className="input-wrapper">
      <input className="input" type="text" placeholder="Type something..." />
      <div className="send">
        <label htmlFor="send-file">
          <AttachFileIcon />
        </label>
        <input type="file" id="send-file" style={{ display: "none" }} />
        <Button size="xm medium" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Input;
