import React from "react";
import InputMessage from "../InputMessage/InputMessage";
import { AppBar, Toolbar } from "@mui/material";
import Message from "./Message";

const Messages = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "calc(85vh - 85px)", overflowY: "scroll" }}>
        <Message />
        <Message owner={true} />
        <Message />
        <Message />
        <Message />
      </div>
      <InputMessage></InputMessage>
    </div>
  );
};

export default Messages;