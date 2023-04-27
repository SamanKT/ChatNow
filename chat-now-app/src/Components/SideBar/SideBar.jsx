import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";
import { Avatar, CardHeader, IconButton } from "@mui/material";
import img from "../../assets/image/profile-photo.jpg";
import Card from "@mui/material/Card";

const users = ["John", "Jane", "Niki"];
const SideBar = () => {
  const [user, setUser] = useState(users);

  return (
    <>
      <Navbar></Navbar>
      <Searchbar users={users}></Searchbar>

      {users.map((user) => {
        return (
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
          >
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: "inherit" }} src={img}></Avatar>}
              action={<IconButton aria-label="settings"></IconButton>}
              title={user}
              subheader="hello John"
              subheaderTypographyProps={{ color: "#FFF8DC", fontSize: "12px" }}
              sx={{ color: "#FFF8DC" }}
            />
          </Card>
        );
      })}
    </>
  );
};

export default SideBar;
