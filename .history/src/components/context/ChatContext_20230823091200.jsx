import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

    const INITIALSTATE =
  return (
    <ChatContext.Provider value={{ currentUser }}>
      {children}
    </ChatContext.Provider>
  );
};
