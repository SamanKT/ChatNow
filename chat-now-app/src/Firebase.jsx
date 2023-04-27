// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
