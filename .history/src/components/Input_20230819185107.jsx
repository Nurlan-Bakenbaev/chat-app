import React from "react";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something" />
      <div className="send">
        <label htmlFor="send-file"></label>
        <input type="file"id="send-file" style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default Input;
