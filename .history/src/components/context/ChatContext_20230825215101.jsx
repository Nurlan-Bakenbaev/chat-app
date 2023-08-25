import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import fire
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };
  const deleteMessage = async (messageId) => {
    try {
      await Firestore.collection("chats").doc(messageId).delete();
      console.log("Message deleted successfully!");
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };


  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch , deleteMessage}}>
      {children}
    </ChatContext.Provider>
  );
};
