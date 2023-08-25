import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import {db} from '../firebase'
impor


const Message = ({message}) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  console.log(data);
  const handleDelete = async (messageId) => {
    try {
      await db.collection("messages").doc(messageId).delete();

      console.log("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span style={{ fontSize: "10px" }}>
          {new Date(
            message.date.seconds * 1000 + message.date.nanoseconds / 1000000
          ).toLocaleString()}
        </span>
        {message.senderId === currentUser.uid && (
          <button onClick={() => handleDelete(message.id)}>Delete</button>
        )}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
