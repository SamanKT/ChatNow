import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import icon from "./assets/image/chat.png";
import React, { useEffect, useState } from "react";
import PortraitIcon from "@mui/icons-material/Portrait";
import { auth } from "./Firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import CircularProgressWithLabel from "./Components/LoadingComponent/CircularProgressWithLabel";
import { storage } from "./Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import AlertMUI from "./Components/Alerts/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);

  const handleLogin = async (e) => {
    setOpenAlert(false);
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const userCreds = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setOpenAlert(true);
      console.log(error.code);
    }
  };

  const inputStyle = {
    border: "none",
    height: "30px",
    width: "70%",
    marginBottom: "10px",
    borderRadius: "5px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#103644",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            bgcolor: "lightblue",
            height: "400px",
            width: "350px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20vh",
            boxShadow: "10",
          }}
        >
          <div
            style={{
              backgroundColor: "#22A4D4",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "50px",
              width: "80%",
              height: "80px",
              borderRadius: "10px",
              boxShadow:
                " rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          >
            <div style={{ display: "flex" }}>
              <Avatar
                src={icon}
                alt=""
                sx={{
                  borderRadius: "10%",
                  objectFit: "cover",
                  height: "25px",
                  width: "25px",
                  mr: "10px",
                }}
              />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {" "}
                ChatNow!
              </Typography>
            </div>
            <Typography variant="body2" sx={{ mt: "8px" }}>
              Login
            </Typography>
          </div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              width: "90%",
              height: "65%",
            }}
            onSubmit={handleLogin}
          >
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              style={inputStyle}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                backgroundColor: "#618593",
                color: "white",
                width: "70%",
                margin: "10px",
                fontSize: "12px",
                height: "25px",
              }}
            >
              Login
            </button>

            <Typography variant="caption" sx={{ fontSize: "10px" }}>
              <a href="/signup">Not having account? click to sign up!</a>
            </Typography>
          </form>
        </Box>
      </div>
      <AlertMUI
        open={openAlert}
        mode={2}
        message={"Invalid Username or Password"}
      />
    </>
  );
};

export default Login;
