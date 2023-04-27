import { useState } from "react";
import Messages from "./Components/Messages/Messages";
import Chat from "./Components/Chat/Chat";
import Navbar from "./Components/Navbar/Navbar";
import SideBar from "./Components/SideBar/SideBar";
import InputMessage from "./Components/InputMessage/InputMessage";
import Signup from "./Signup";

function App() {
  return (
    <div className="home">
      <Signup></Signup>
      {/* <Chat></Chat> */}
    </div>
  );
}

export default App;
