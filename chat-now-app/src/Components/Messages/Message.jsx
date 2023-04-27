import { Avatar, Typography } from "@mui/material";
import React from "react";
import img from "../../assets/image/profile-photo.jpg";

const Message = ({ owner }) => {
  const style = {
    marginBottom: "30px",
    display: "flex",
    flexDirection: owner ? "row" : "row-reverse",
  };

  return (
    <div style={style}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Avatar
          src={img}
          sx={{ width: "25px", height: "25px", m: "0 12px 0 12px" }}
        ></Avatar>
        <span
          style={{ color: "gray", fontSize: "12px", margin: "0 12px 0 12px" }}
        >
          date
        </span>
      </div>
      <div
        style={{
          width: "fit-content",
          height: "fit-content",
          minHeight: "25px",
          maxWidth: "50%",
          minWidth: "20%",
          backgroundColor: owner ? "#D9D28D " : "white",
          borderRadius: "8px 0 8px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ ml: "5px", wordWrap: "break-word" }}
        >
          Hello
        </Typography>
        <img style={{ width: "150px", alignSelf: "center" }}></img>
      </div>
    </div>
  );
};

export default Message;
