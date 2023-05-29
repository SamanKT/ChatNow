import "./devProfile.css";
import { Avatar } from "@mui/material";
import "./scrollSymbol.css";

export const DevProfile = () => {
  const handleClick = () => {
    window.open("https://github.com/SamanKT", "_blank");
  };
  return (
    <main className="container">
      <Avatar
        sx={{ width: 100, height: 100, mr: 5, cursor: "pointer" }}
        src="https://firebasestorage.googleapis.com/v0/b/chat-61303.appspot.com/o/default%2FprofilePic.jpg?alt=media&token=c94bcc91-3708-4a1b-be2f-9c362cdfc082"
        onClick={handleClick}
      ></Avatar>
      <p>Hello 👋 I'm</p>
      <section className="animation">
        <div className="first">
          <div style={{ cursor: "pointer" }} onClick={handleClick}>
            Saman Khataei
          </div>
        </div>
        <div className="second">
          <div style={{ cursor: "pointer" }} onClick={handleClick}>
            React Developer
          </div>
        </div>
        <div className="third">
          <div style={{ cursor: "pointer" }} onClick={handleClick}>
            Java Developer
          </div>
        </div>
      </section>

      <div>
        This project is a prototype developed by ReactJS and Firebase
        technologies. Some features can be listed as:
        <ul>
          <li>MUI for the component styling</li>
          <li>Firestore for data management</li>
          <li>Firebase Strorage for images and profile pics</li>
          <li>Realtime listeners to track sent and received messages</li>
          <li>Image resizer on Client side to manage the uploaded files</li>
          <li>Authentication and basic security configurations</li>
        </ul>
      </div>

      <div className="icon-scroll" style={{ marginTop: "35vh" }}></div>
    </main>
  );
};
