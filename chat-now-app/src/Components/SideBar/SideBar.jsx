import React, { useContext, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";
import { Avatar, CardHeader, IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { Context } from "../../Context/AuthContext";
import { useEffect } from "react";
import { createChatIfNotExistOrGetLastMessage, db } from "../../Firebase";
import { ChatContext } from "../../Context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";

const SideBar = () => {
  const { users, currentUser } = useContext(Context);
  const { dispatch } = useContext(ChatContext);
  const [people, setPeople] = useState([]);
  const [friends, setFriends] = useState({});
  useEffect(() => {
    setPeople(users);
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      let data = doc.data();
      data = { ...data };

      setFriends({ ...friends, ...data });
    });
    return () => {
      unsub();
    };
  }, [users]);
  const handleSelectUser = async (selectedUser) => {
    const massagesObject = await createChatIfNotExistOrGetLastMessage(
      currentUser,
      selectedUser
    );

    // selectedUser.messages = massagesObject.messages;
  };

  const handleSelectFriend = async (selectedUser) => {
    dispatch({ type: "SET_CHAT", payload: selectedUser });
  };

  return (
    <>
      <Navbar></Navbar>
      <Searchbar users={users} setPeople={setPeople}></Searchbar>
      <Typography variant="subtitle2" noWrap sx={{ mt: 3, color: "#FFF8DC" }}>
        Friends
      </Typography>
      {Object.keys(friends).map((key) => {
        return (
          currentUser.uid !== friends[key].friendInfo.uid && (
            <Card
              key={friends[key].friendInfo.uid}
              elevation={0}
              sx={{
                bgcolor: "inherit",
                opacity: "0.8",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "#696969",
                },
              }}
              onClick={() => handleSelectFriend(friends[key])}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: "inherit" }}
                    src={friends[key].friendInfo.photoURL}
                  ></Avatar>
                }
                action={<IconButton aria-label="settings"></IconButton>}
                title={friends[key].friendInfo.name}
                subheader={
                  // friends[key]?.messages[friends[key].messages.length - 1]
                  "Hello"
                }
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

      <Typography variant="subtitle2" noWrap sx={{ mt: 3, color: "#FFF8DC" }}>
        People
      </Typography>
      {people.map((user) => {
        return (
          currentUser.uid !== user.uid &&
          !Object.keys(friends).includes(user.uid) && (
            <Card
              key={user.uid}
              elevation={0}
              sx={{
                bgcolor: "inherit",
                opacity: "0.8",

                "&:hover": {
                  bgcolor: "#696969",
                },
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: "inherit" }}
                    src={user.photoURL}
                  ></Avatar>
                }
                action={
                  <IconButton
                    aria-label="settings"
                    sx={{ color: "#FFF8DC" }}
                    onClick={() => handleSelectUser(user)}
                  >
                    +
                  </IconButton>
                }
                title={user.name}
                subheader={user?.messages[user.messages.length - 1]}
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
