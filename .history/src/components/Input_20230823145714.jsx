import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { useContext, useState } from "react";
import { arrayUnion } from "firebase/firestore";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const db = getFirestore();
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  import { v4 as uuidv4 } from 'uuid';

  const handleSend = async () => {
    if (img) {
    } else {
      await updateDoc(doc(db,"chats",data.childId),{
        messages: arrayUnion({
          id:uuidv4,
          text
        })
      });
    }
  };

  return (
    <div className="input-wrapper">
      <input
        className="input"
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send">
        <label htmlFor="send-file">
          <AttachFileIcon />
        </label>
        <input
          type="file"
          id="send-file"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <Button
          size="small"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Input;
