import React from "react";
import img from "../../assets/image/profile-photo.jpg";
import icon from "../../assets/image/chat.png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        height: "45px",
        paddingLeft: "5px",
      }}
      wrap="wrap"
    >
      <Grid item xs={2} md={2}>
        <Avatar
          src={icon}
          alt=""
          sx={{
            borderRadius: "10%",
            objectFit: "cover",
            height: "25px",
            width: "25px",
          }}
        />
      </Grid>
      <Grid item xs={7} md={8} sx={{}}>
        <Typography variant="button" noWrap color={"#FFF8DC"}>
          John Wayne
        </Typography>
      </Grid>
      <Grid item xs={3} md={2} sx={{}}>
        <Avatar
          alt="your photo"
          src={img}
          sx={{
            width: 35,
            height: 35,
            cursor: "pointer",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Navbar;
