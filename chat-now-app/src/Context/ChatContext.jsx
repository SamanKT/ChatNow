import { createContext, useContext, useEffect, useState } from "react";
import { auth, app, getAllUsers, getAllChatsOfUser } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const [chats, setChats] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    const fetchingChats = async () => {
      const fetchedChats = await getAllChatsOfUser(currentUser.uid);

      setChats(fetchedChats);
    };
    fetchingChats();
    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  return (
    <ChatContext.Provider value={{ currentUser, chats }}>
      {children}
    </ChatContext.Provider>
  );
};
