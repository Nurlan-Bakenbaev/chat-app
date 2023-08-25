import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

    const INITIAL_STATE = {
        chat
    }
  return (
    <ChatContext.Provider value={{ currentUser }}>
      {children}
    </ChatContext.Provider>
  );
};
