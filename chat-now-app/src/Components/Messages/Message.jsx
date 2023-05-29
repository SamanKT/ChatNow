import { Avatar, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ImageAlert from "../Alerts/ImageAlert";

const Message = ({ owner, body, photoUrl, date, image }) => {
  const [open, setOpen] = useState(false);
  const style = {
    marginBottom: "30px",
    display: "flex",
    flexDirection: owner ? "row" : "row-reverse",
  };

  const ref = useRef();
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [body]);

  const getDateWithCustomFormat = (date) => {
    const formattedDate = new Date(date.seconds * 1000);
    let year = formattedDate.getUTCFullYear() + "";
    year = year.substring(year.length - 2, year.length);
    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();
    const hour = formattedDate.getHours();
    let min = formattedDate.getMinutes();
    if ((min + "").length === 1) min = "0" + min;

    const output = `${year}/${month}/${day} ${hour}:${min}`;
    return output;
  };

  return (
    <div style={style} ref={ref}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Avatar
          src={photoUrl}
          sx={{ width: "25px", height: "25px", m: "0 12px 0 12px" }}
        ></Avatar>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          alignItems: owner ? "flex-start" : "flex-end",
        }}
      >
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
            {body}
          </Typography>
          <img
            src={image}
            style={{ width: "150px", alignSelf: "center", borderRadius: 5 }}
            onClick={() => setOpen(true)}
          ></img>
        </div>
        <Typography
          variant="caption"
          sx={{ color: "gray", ml: 1, mr: 1, fontSize: 9 }}
        >
          {getDateWithCustomFormat(date)}
        </Typography>
      </div>

      <ImageAlert
        img={image}
        open={open}
        setOpen={setOpen}
        disabled="none"
      ></ImageAlert>
    </div>
  );
};

export default Message;
