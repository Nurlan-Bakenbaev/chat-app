import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { useContext, useState } from "react";
import { Timestamp, arrayUnion } from "firebase/firestore";
import { storage } from "../firebase";
import { v4 as uuid} from "uuid";
import { uploadBytesResumable } from "firebase/storage";
import {}
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const db = getFirestore();
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
  
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
  
    const handleSend = async () => {
      if (img) {
        const storageRef = ref(storage, uuid());
  
        const uploadTask = uploadBytesResumable(storageRef, img);
  
        uploadTask.on(
          (error) => {
            //TODO:Handle Error
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
  
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      setText("");
      setImg(null);
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
}
export default Input;
