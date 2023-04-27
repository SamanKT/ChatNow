import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button } from "@mui/material";

const InputMessage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <input
        type="text"
        name="input"
        id="input"
        placeholder=" Type your message"
        style={{
          height: "30px",
          width: "80%",
          border: "none",
          borderRadius: "5px",
          paddingLeft: "8px",
        }}
      />

      <input
        type="file"
        name="attachFile"
        id="attachFile"
        hidden
        accept="image/*"
        datatype=""
      />
      <label htmlFor="attachFile">
        <AttachFileIcon
          sx={{ cursor: "pointer", height: "25px", color: "gray" }}
        />
      </label>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#138D75",
          height: "25px",
          "&:hover": {
            bgcolor: "#73C6B6",
          },
          mr: "20px",
        }}
      >
        Send
      </Button>
    </div>
  );
};

export default InputMessage;
