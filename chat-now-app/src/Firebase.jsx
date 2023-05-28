// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Compress from "compress.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSofTknLF31Nt2pto2N4sZ6j15fQydFsk",
  authDomain: "chat-61303.firebaseapp.com",
  projectId: "chat-61303",
  storageBucket: "chat-61303.appspot.com",
  messagingSenderId: "858629957147",
  appId: "1:858629957147:web:aa66c6a34301b78cf4babe",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
export const getAllUsers = async () => {
  let users = [];

  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const dataFromDb = doc.data();
      const data = { ...dataFromDb, uid: doc.id };
      users.push(data);
    });
  } catch (err) {
    console.log(err);
  }

  return users;
};

export const createChatIfNotExistOrGetLastMessage = async (
  currentUser,
  friend
) => {
  const combinedIds =
    currentUser.uid < friend.uid
      ? currentUser.uid + friend.uid
      : friend.uid + currentUser.uid;
  const docRef = doc(db, "userChats", currentUser.uid);
  const docSnap = await getDoc(docRef);
  let friendObject = {};
  const chats = docSnap.data();
  await setDoc(doc(db, "chats", combinedIds), {});
  if (!chats[friend.uid]) {
    const refOwner = doc(db, "userChats", currentUser.uid);
    const refPartner = doc(db, "userChats", friend.uid);
    friendObject = {
      [friend.uid]: {
        lastMessages: {},
        friendInfo: {
          name: friend.name,
          photoURL: friend.photoURL,
          uid: friend.uid,
        },
      },
    };

    await updateDoc(refOwner, friendObject, { merge: true });
    await updateDoc(
      refPartner,
      {
        [currentUser.uid]: {
          lastMessages: {},
          friendInfo: {
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
          },
        },
      },
      { merge: true }
    );
  }
  return friendObject;
};
export const getAllChatsOfUser = async (id) => {
  let chats = {};

  try {
    const docRef = doc(db, "userChats", id);
    const docSnap = await getDoc(docRef);
    chats = docSnap.data();
  } catch (err) {}
  return chats;
};

export const setMessageAsRead = async (id, friendId) => {
  const ref = doc(db, "userChats", id);
  await setDoc(
    ref,
    {
      [friendId]: {
        lastMessages: {
          read: true,
        },
      },
    },
    { merge: true }
  );
};

export const resizeImageFn = async (file) => {
  const compress = new Compress();
  const resizedImage = await compress.compress([file], {
    size: 1, // the max size in MB, defaults to 2MB
    quality: 1, // the quality of the image, max is 1,
    maxWidth: 300, // the max width of the output image, defaults to 1920px
    maxHeight: 300, // the max height of the output image, defaults to 1920px
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
  });
  const img = resizedImage[0];
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFile = Compress.convertBase64ToFile(base64str, imgExt);
  return resizedFile;
};
