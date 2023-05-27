import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import icon from "./assets/image/chat.png";
import React, { useState } from "react";
import PortraitIcon from "@mui/icons-material/Portrait";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import CircularProgressWithLabel from "./Components/LoadingComponent/CircularProgressWithLabel";
import { storage } from "./Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";
//import cat1 from "https://firebasestorage.googleapis.com/v0/b/chat-61303.appspot.com/o/default%2Fcat-avatar.jpg?alt=media&token=c250b80d-0a55-481d-afc1-a07e1409a15e";
import { useNavigate } from "react-router-dom";
import AlertMUI from "./Components/Alerts/Alert";

const Signup = () => {
  const [progress, setProgress] = useState(0);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loadingShow, setLoadingShow] = useState(false);
  const [openAlert, setOpenAlert] = useState({ open: false, message: "" });
  const [passLength, setPassLength] = useState("");

  const navigate = useNavigate();

  const handleImageSelect = (e) => {
    setLoadingShow(true);

    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setPreviewImage(fileReader.result);
      setLoadingShow(false);
    });
    fileReader.readAsDataURL(file);
    setImageSelected(true);
  };
  console.log(passLength);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passLength < 6) {
      setOpenAlert({
        open: true,
        message: "The password must be at least 6 characters!",
        mode: 2,
      });
      return;
    }

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    let file = e.target[3].files[0];

    setUploadStarted(true);
    const userCreds = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/{image name}'
    const storageRef = ref(storage, "images/" + name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setProgress((prev) => {
          const newProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          return newProgress > 0 ? newProgress : 100;
        });
      },
      (error) => {},
      () => {
        // Upload completeenfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(userCreds.user, {
            displayName: name,
            photoURL: file
              ? downloadURL
              : "https://firebasestorage.googleapis.com/v0/b/chat-61303.appspot.com/o/default%2Fcat-avatar.jpg?alt=media&token=c250b80d-0a55-481d-afc1-a07e1409a15e",
          });
          await setDoc(doc(db, "users", userCreds.user.uid), {
            name: userCreds.user.displayName,
            photoURL: userCreds.user.photoURL,
            email: userCreds.user.email,
          });

          await setDoc(doc(db, "userChats", userCreds.user.uid), {});

          e.target.reset(); // to reset the form after uploading is finished

          setUploadStarted(false);
          setImageSelected(false);
          setOpenAlert({
            open: true,
            message: "You have successfully registered!",
            mode: 1,
          });
          setInterval(() => {
            navigate("/");
            window.location.reload(true);
          }, 3000);
        });
      }
    );
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
            Register
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
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            required
            style={inputStyle}
          />
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
            minLength={6}
            required
            style={inputStyle}
            onChange={(e) => setPassLength(e.target.value.length)}
          />
          <div
            style={{
              border: "none",
              height: "40px",
              width: "70%",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="avatar">
              {imageSelected ? (
                <>
                  {loadingShow ? (
                    <CircularProgress></CircularProgress>
                  ) : (
                    <img
                      src={previewImage}
                      alt="your image"
                      style={{
                        width: "35px",
                        height: "35px",
                        objectFit: "cover",
                        marginTop: "3px",
                      }}
                    ></img>
                  )}
                </>
              ) : (
                <PortraitIcon
                  sx={{ cursor: "pointer", width: "40px", mt: "3px" }}
                ></PortraitIcon>
              )}
            </label>
            <Typography
              variant="caption"
              sx={{ color: "gray", ml: "5px", mr: "30px" }}
            >
              Add avatar (optional)
            </Typography>
          </div>
          <input
            type="file"
            name="avatar"
            id="avatar"
            hidden
            accept="image/*"
            onChange={handleImageSelect}
          />

          {uploadStarted ? (
            <CircularProgressWithLabel
              value={progress}
              sx={{ zIndex: "3" }}
            ></CircularProgressWithLabel>
          ) : (
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
              Submit
            </button>
          )}

          <Typography variant="caption" sx={{ fontSize: "10px", mb: "8px" }}>
            <a href="/login">Already registered? click to sign in!</a>
          </Typography>
        </form>
        <AlertMUI
          open={openAlert.open}
          mode={openAlert.mode}
          message={openAlert.message}
        />
      </Box>
    </div>
  );
};

export default Signup;
