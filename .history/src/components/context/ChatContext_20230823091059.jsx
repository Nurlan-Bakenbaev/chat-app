import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  return (
    <ChatContext.Provider value={{ currentUser }}>
      {children}
    </ChatContext.Provider>
  );
};
