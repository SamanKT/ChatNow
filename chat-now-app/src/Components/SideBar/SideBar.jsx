import React, { useContext, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";
import { Avatar, CardHeader, IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { Context } from "../../Context/AuthContext";
import { useEffect } from "react";
import {
  createChatIfNotExistOrGetLastMessage,
  db,
  getAllChatsOfUser,
  setMessageAsRead,
} from "../../Firebase";
import { ChatContext } from "../../Context/ChatContext";
import "../../messageStyles.css";
import { doc, onSnapshot } from "firebase/firestore";

const SideBar = () => {
  const { users, currentUser } = useContext(Context);
  const { dispatch } = useContext(ChatContext);
  const [people, setPeople] = useState([]);
  const [friends, setFriends] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setPeople(users);
    const getFreinds = async () => {
      const friends = await getAllChatsOfUser(currentUser?.uid);
      setFriends(friends);
    };

    const ref = doc(db, "userChats", currentUser?.uid);
    let unsub = () => {};
    unsub = onSnapshot(ref, (doc) => {
      let data = doc?.data();
      getFreinds();
    });
    return () => {
      unsub();
    };
  }, [users, refresh]);
  const handleSelectUser = async (selectedUser) => {
    const friendObj = await createChatIfNotExistOrGetLastMessage(
      currentUser,
      selectedUser
    );

    setRefresh(!refresh);
  };
  const handleSelectFriend = async (selectedUser) => {
    dispatch({ type: "SET_CHAT", payload: selectedUser });
    setMessageAsRead(currentUser.uid, selectedUser.friendInfo.uid);
  };
  return (
    <>
      <Navbar></Navbar>
      <Searchbar
        users={users}
        setPeople={setPeople}
        friends={friends}
        setFriends={setFriends}
      ></Searchbar>
      <Typography variant="subtitle2" noWrap sx={{ mt: 3, color: "#FFF8DC" }}>
        Friends
      </Typography>
      <div className="scroll" style={{ overflowY: "auto" }}>
        {Object.keys(friends)
          .sort(
            (x, y) =>
              friends[y].lastMessages.timestamp -
              friends[x].lastMessages.timestamp
          )
          .map((key) => {
            return (
              currentUser?.uid !== friends[key]?.friendInfo?.uid && (
                <Card
                  key={friends[key]?.friendInfo.uid}
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
                        src={friends[key]?.friendInfo.photoURL}
                      ></Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <div
                          className="pulsate-bck"
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 10,
                            border: "1px solid ",
                            backgroundColor: "#C32F07",
                          }}
                          hidden={friends[key]?.lastMessages.read}
                        ></div>
                      </IconButton>
                    }
                    title={friends[key]?.friendInfo.name}
                    subheader={friends[key]?.lastMessages.body}
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
      </div>
      <Typography variant="subtitle2" noWrap sx={{ mt: 3, color: "#FFF8DC" }}>
        People
      </Typography>
      <div className="scroll" style={{ overflowY: "auto" }}>
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
                  subheader={""}
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
      </div>
    </>
  );
};

export default SideBar;
