
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
  const handleSend = async()=>{
      if(img){
  }else{
await
  }
  }

  return (
    <div className="input-wrapper">
      <input className="input" type="text" placeholder="Type something..."
      onChange={e=>setText(e.target.value)} />
      <div className="send">
        <label htmlFor="send-file">
          <AttachFileIcon />
        </label>
        <input type="file" id="send-file" style={{ display: "none" }}
        onChange={e=>setImg(e.target.files[0])} />
        <Button 
        size="small" 
        variant="contained" 
        endIcon={<SendIcon />}
        onClick={handleSend}>
         Send
        </Button>
      </div>
    </div>
  );
};

export default Input;
