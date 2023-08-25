import React, { useContext } from "react";

const Message = () => {
  const {currentUser}= useContext
  return (
    <div className="message owner">
      <div className="messageInfo">
       <img src="https://images.pexels.com/photos/5197322/pexels-photo-5197322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
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
