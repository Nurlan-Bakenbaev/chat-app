import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something" />
      <div className="send">
        <label htmlFor="send-file">
          <AttachFileIcon />
        </label>
        <input type="file" id="send-file" style={{ display: "none" }} />
        <Button size="s" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Input;