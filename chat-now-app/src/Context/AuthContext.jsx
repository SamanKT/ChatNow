import { createContext, useContext, useEffect, useState } from "react";
import { auth, app, getAllUsers } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const Context = createContext();

export const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    const fetchingUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };
    fetchingUsers();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Context.Provider value={{ currentUser, loading, users }}>
      {children}
    </Context.Provider>
  );
};
