import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";
import { ChatContext } from "./components/context/ChatContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChatContext.Provider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContext.Provider>
  </AuthContextProvider>
);
