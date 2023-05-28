import React, { useContext } from "react";
import img from "../../assets/image/profile-photo.jpg";
import icon from "../../assets/image/chat.png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import { Context } from "../../Context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(Context);
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
      <Grid item xs={6} md={7} sx={{}}>
        <Typography variant="button" noWrap color={"#FFF8DC"}>
          {currentUser.displayName}
        </Typography>
      </Grid>
      <Grid item xs={4} md={3} sx={{}}>
        <Avatar
          alt="your photo"
          src={currentUser.photoURL}
          sx={{
            width: 40,
            height: 40,
            cursor: "pointer",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Navbar;
