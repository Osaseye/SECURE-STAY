import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBubad84nKV_vLm6eRx13nJ0u2VQhhlT-4",
  authDomain: "stay-b5cad.firebaseapp.com",
  projectId: "stay-b5cad",
  storageBucket: "stay-b5cad.firebasestorage.app",
  messagingSenderId: "838877333913",
  appId: "1:838877333913:web:aa82609305c1803dbdeb08",
  measurementId: "G-L4WM4S5XQD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
