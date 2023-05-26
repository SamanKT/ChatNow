import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth, app, getAllUsers, getAllChatsOfUser } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [chats, setChats] = useState({});

  const INITIAL_STATE = {
    combinedId: "",
    friend: {},
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    const fetchingChats = async () => {
      const fetchedChats = await getAllChatsOfUser(currentUser?.uid);

      setChats(fetchedChats);
    };
    fetchingChats();
    return () => {
      unsubscribe();
    };
  }, [currentUser]);
  const getChatWithFriend = (state, action) => {
    switch (action.type) {
      case "SET_CHAT":
        return {
          combinedId:
            currentUser.uid < action.payload.friendInfo.uid
              ? currentUser.uid + action.payload.friendInfo.uid
              : action.payload.friendInfo.uid + currentUser.uid,
          friend: action.payload,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(getChatWithFriend, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ currentUser, friend: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
