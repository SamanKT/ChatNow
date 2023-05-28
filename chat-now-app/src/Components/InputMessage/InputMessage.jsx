import React, { useContext, useEffect, useRef, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button } from "@mui/material";
import img from "../../assets/image/cat-avatar.jpg";
import { ChatContext } from "../../Context/ChatContext";
import {
  updateDoc,
  setDoc,
  doc,
  Timestamp,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db, resizeImageFn, storage } from "../../Firebase";
import ImageAlert from "../Alerts/ImageAlert";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

const InputMessage = ({ disableSend }) => {
  const { friend, currentUser } = useContext(ChatContext);
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [open, setOpen] = useState(false);
  const refToFileInput = useRef();

  const handleMessageSend = async (e) => {
    e.preventDefault();
    const messageId = uuidv4();
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + messageId);
    if (img) {
      const resizedImg = await resizeImageFn(img);

      const uploadTask = uploadBytesResumable(storageRef, resizedImg, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", friend.combinedId), {
              messages: arrayUnion({
                id: messageId,
                time: Timestamp.now(),
                senderId: currentUser.uid,
                body: text,
                file: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      if (text) {
        await updateDoc(doc(db, "chats", friend.combinedId), {
          messages: arrayUnion({
            id: messageId,
            time: Timestamp.now(),
            senderId: currentUser.uid,
            body: text,
            file: "",
          }),
        });
      }
    }
    const currentUid = currentUser.uid;
    await setDoc(
      doc(db, "userChats", friend.friend.friendInfo.uid),
      {
        [currentUid]: {
          lastMessages: {
            body: text,
            timestamp: serverTimestamp(),
            read: false,
          },
        },
      },
      { merge: true }
    );
    setText("");
    handleClearImgInput();
  };
  const handleClearImgInput = () => {
    refToFileInput.current.value = "";
    setImg("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <form
        onSubmit={handleMessageSend}
        style={{ width: "100%", display: "flex", flexDirection: "row" }}
      >
        <input
          type="text"
          name="input"
          id="input"
          placeholder=" Type your message"
          style={{
            height: "30px",
            width: "100%",
            border: "none",
            borderRadius: "5px",
            paddingLeft: "8px",
            background: img,
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disableSend}
        />

        <input
          ref={refToFileInput}
          type="file"
          name="attachFile"
          id="attachFile"
          hidden
          accept="image/*"
          datatype=""
          onInput={(e) => {
            setImg(e.target.files[0]);
            setOpen(true);
          }}
        />
        <label htmlFor="attachFile">
          <AttachFileIcon
            sx={{ cursor: "pointer", height: "25px", color: "gray" }}
          />
        </label>
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#138D75",
            height: "25px",
            "&:hover": {
              bgcolor: "#73C6B6",
            },
            mr: "20px",
          }}
          disabled={disableSend}
        >
          Send
        </Button>
      </form>
      <ImageAlert
        handleMessageSend={handleMessageSend}
        img={img}
        setImg={setImg}
        text={text}
        open={open}
        setOpen={setOpen}
        setText={setText}
        handleClearImgInput={handleClearImgInput}
      ></ImageAlert>
    </div>
  );
};

export default InputMessage;
