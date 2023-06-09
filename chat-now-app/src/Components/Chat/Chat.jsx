import React, { useContext, useState } from "react";
import SideBar from "../SideBar/SideBar";
import InputMessage from "../InputMessage/InputMessage";
import Messages from "../Messages/Messages";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import AlertDialog from "../Alerts/AlertDialog";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { ChatContext } from "../../Context/ChatContext";
import "../../messageStyles.css";

const Chat = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { friend, dispatch } = useContext(ChatContext);
  const [openAlert, setOpenAlert] = useState(false);

  const handlePop = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handleSignOut = async (e) => {
    try {
      await signOut(auth);
      dispatch({ type: "RESET_CHAT", payload: {} });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="mobileWidth">
      <Grid
        container
        spacing={1}
        sx={{
          height: "85vh",

          mt: "5vh",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#E1E1C8",
          flexWrap: "nowrap",
          overflowX: "auto",
        }}
      >
        <Grid
          item
          xs={6}
          sm={3}
          minWidth={200}
          maxWidth={300}
          sx={{ bgcolor: "#2F4F4F" }}
        >
          <SideBar></SideBar>
        </Grid>
        <Grid item xs={6} sm={9} minWidth={280} sx={{}}>
          <Box
            sx={{
              flexGrow: 1,
              m: "-8px 0 8px -8px",
            }}
            elevation={0}
          >
            <AppBar
              position="sticky"
              sx={{
                height: "35px",
                width: "100%",
                bgcolor: "#2F4F4F",
                alignItems: "end",
              }}
              elevation={0}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "96%",
                }}
              >
                <Typography variant="body2">
                  {friend?.friend.friendInfo?.name}
                </Typography>

                <Toolbar
                  sx={{
                    minHeight: "20px",
                    height: "35px",
                  }}
                  disableGutters
                  variant="dense"
                >
                  <VideocamIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => setOpenAlert(!openAlert)}
                  />
                  <AddIcCallIcon
                    sx={{ ml: "10px", cursor: "pointer" }}
                    onClick={() => setOpenAlert(!openAlert)}
                  />
                  <Box>
                    <IconButton
                      size="medium"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={handlePop}
                      sx={{ ml: "6px" }}
                    >
                      <MoreIcon />
                    </IconButton>
                    <Popover
                      anchorEl={anchorEl}
                      open={open}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      onClose={() => setAnchorEl(null)}
                    >
                      <Button color="inherit" onClick={handleSignOut}>
                        Logout
                      </Button>
                    </Popover>
                  </Box>
                </Toolbar>
              </div>
            </AppBar>
          </Box>
          <Messages></Messages>
        </Grid>
      </Grid>
      <AlertDialog
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      ></AlertDialog>
    </div>
  );
};

export default Chat;
