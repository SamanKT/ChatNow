import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthContext } from "./Context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChatContextProvider } from "./Context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContext>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </AuthContext>
);
