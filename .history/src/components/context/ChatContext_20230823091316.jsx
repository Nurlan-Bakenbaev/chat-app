import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

    const INITIAL_STATE = {
        chatId:'null',
        user:{}
    }
    const chatReducer = (state,action)
  return (
    <ChatContext.Provider value={{ currentUser }}>
      {children}
    </ChatContext.Provider>
  );
};
