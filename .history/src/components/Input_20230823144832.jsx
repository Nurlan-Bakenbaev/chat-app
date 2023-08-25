
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { useContext,useState } from "react";

const Input = () => {
  const [text,setText] = useState('')
  const [img,setImg] = useState(null)

  const {currentUser}= useContext(AuthContext)
  const {data}= useContext(ChatContext)
  return (
    <div className="input-wrapper">
      <input className="input" type="text" placeholder="Type something..." />
      <div className="send">
        <label htmlFor="send-file">
          <AttachFileIcon />
        </label>
        <input type="file" id="send-file" style={{ display: "none" }} />
        <Button 
        size="small" 
        variant="contained" 
        endIcon={<SendIcon />}>
         Send
        </Button>
      </div>
    </div>
  );
};

export default Input;
