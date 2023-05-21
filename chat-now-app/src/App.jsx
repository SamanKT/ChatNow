import { createContext, useContext, useEffect, useRef, useState } from "react";
import Chat from "./Components/Chat/Chat";
import Signup from "./Signup";
import Login from "./Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { auth, app } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import LinearProgress from "@mui/material/LinearProgress";
import { AuthContext, Context } from "./Context/AuthContext";

function App() {
  const { currentUser, loading } = useContext(Context);

  return loading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50vh",
      }}
    >
      <LinearProgress
        color="success"
        sx={{
          width: "30vw",
        }}
      />
    </div>
  ) : (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/">
            <Route index element={currentUser ? <Chat /> : <Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            {/* ... etc. */}
          </Route>
        )
      )}
    ></RouterProvider>
  );
}

export default App;
