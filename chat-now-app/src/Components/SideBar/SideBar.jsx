import React, { useContext, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";
import { Avatar, CardHeader, IconButton } from "@mui/material";
import img from "../../assets/image/profile-photo.jpg";
import Card from "@mui/material/Card";
import { Context } from "../../Context/AuthContext";
import { useEffect } from "react";
import { createChatIfNotExistOrGetMessages } from "../../Firebase";
import { ChatContext } from "../../Context/ChatContext";

const SideBar = () => {
  const { users, currentUser } = useContext(Context);
  const { chats } = useContext(ChatContext);
  const [people, setPeople] = useState([]);
  useEffect(() => {
    setPeople(users);
  }, [users, chats]);
  const handleSelectUser = async (selectedUser) => {
    const massagesObject = await createChatIfNotExistOrGetMessages(
      currentUser.uid,
      selectedUser.uid
    );
    selectedUser.messages = massagesObject.messages;
  };

  return (
    <>
      <Navbar></Navbar>
      <Searchbar users={users} setPeople={setPeople}></Searchbar>

      {people.map((user) => {
        return (
          currentUser.uid !== user.uid && (
            <Card
              key={user}
              elevation={0}
              sx={{
                bgcolor: "inherit",
                opacity: "0.8",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "#696969",
                },
              }}
              onClick={() => handleSelectUser(user)}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: "inherit" }}
                    src={user.photoURL}
                  ></Avatar>
                }
                action={<IconButton aria-label="settings"></IconButton>}
                title={user.name}
                subheader={user.messages[user.messages.length - 1]}
                subheaderTypographyProps={{
                  color: "#FFF8DC",
                  fontSize: "12px",
                }}
                sx={{ color: "#FFF8DC" }}
              />
            </Card>
          )
        );
      })}
    </>
  );
};

export default SideBar;
