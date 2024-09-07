import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzmCQw52aYer02PhO3bPaUE3yqZZhPJa8",
  authDomain: "samplelogin-127d8.firebaseapp.com",
  projectId: "samplelogin-127d8",
  storageBucket: "samplelogin-127d8.appspot.com",
  messagingSenderId: "499305873166",
  appId: "1:499305873166:web:87bc29d61972a8532e615f",
  measurementId: "G-40E9XEFNNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
